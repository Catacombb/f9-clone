import { NextRequest, NextResponse } from 'next/server';

// Define the expected request body type
interface ChatRequest {
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
}

// Helper to safely extract content from different model formats
function extractModelContent(data: any): string {
  try {
    // Standard OpenAI/Claude format
    if (data?.choices?.[0]?.message?.content) {
      return data.choices[0].message.content;
    }
    
    // Alternate format sometimes used by Mistral
    if (data?.choices?.[0]?.content) {
      return data.choices[0].content;
    }
    
    // Some models return direct text in generated_text
    if (data?.generated_text) {
      return data.generated_text;
    }
    
    // If choices exist but in different format
    if (data?.choices?.[0] && typeof data.choices[0] === 'object') {
      // Try to find any property that might contain text content
      const choice = data.choices[0];
      // Look for common content field names
      for (const key of ['text', 'output', 'result', 'answer', 'response']) {
        if (typeof choice[key] === 'string' && choice[key].trim()) {
          return choice[key];
        }
      }
      
      // Last resort - stringify the whole object
      return JSON.stringify(choice);
    }
    
    throw new Error('Could not extract content from model response');
  } catch (error) {
    console.error('Error extracting model content:', error);
    return "I encountered an issue processing the response. Please try again.";
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body: ChatRequest = await req.json();
    
    // Validate the request
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Get OpenRouter API key from environment variables
    const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenRouter API key is not configured');
      return NextResponse.json(
        { error: 'OpenRouter API key is not configured' },
        { status: 500 }
      );
    }

    // Make request to OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'F9 Productions Chatbot'
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'mistralai/mistral-7b-instruct',
        messages: body.messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', errorData);
      try {
        const jsonError = JSON.parse(errorData);
        console.error('Parsed error:', jsonError);
      } catch {
        // It's not JSON, that's fine
      }
      return NextResponse.json(
        { error: 'Error communicating with OpenRouter' },
        { status: 500 }
      );
    }

    try {
      // Parse the response
      const data = await response.json();
      
      // Debug the response format
      console.log('OpenRouter response structure:', JSON.stringify(data, null, 2));
      
      // Enhanced response validation
      if (!data) {
        console.error('Empty response from OpenRouter');
        return NextResponse.json(
          { content: "I apologize, but I received an empty response. Please try again." }
        );
      }

      // Extract content using helper function
      const content = extractModelContent(data);
      
      // Return the normalized response
      return NextResponse.json({ content });
      
    } catch (error) {
      console.error('Error processing OpenRouter response:', error);
      return NextResponse.json(
        { content: "I apologize, but I encountered an unexpected response format. Please try again." }
      );
    }
    
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 