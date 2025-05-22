import { NextRequest, NextResponse } from 'next/server';

// Define the expected request body type
interface ChatRequest {
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
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
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000', // Your site URL
        'X-Title': 'F9 Productions Chatbot' // Your site name
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'mistralai/mistral-7b-instruct-v0.2', // Using a specific version
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
      } catch (_e) {
        // It's not JSON, that's fine
      }
      return NextResponse.json(
        { error: 'Error communicating with OpenRouter' },
        { status: 500 }
      );
    }

    // Parse the response
    const data = await response.json();
    
    // Debug the response format
    console.log('OpenRouter response structure:', JSON.stringify(data, null, 2));
    
    // Enhanced response validation
    if (!data || !data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      console.error('Unexpected response format from OpenRouter:', data);
      return NextResponse.json(
        { error: 'Received invalid response format from AI provider' },
        { status: 500 }
      );
    }

    // Handle different response formats safely
    let content = '';
    try {
      // Try to get content from standard format
      if (data.choices[0].message && data.choices[0].message.content) {
        content = data.choices[0].message.content;
      } 
      // Fall back to other possible formats
      else if (data.choices[0].content) {
        content = data.choices[0].content;
      }
      // Last resort - try to extract text from any format
      else if (typeof data.choices[0] === 'object') {
        content = JSON.stringify(data.choices[0]);
      }
      
      if (!content) {
        throw new Error('Could not extract content from response');
      }
    } catch (error) {
      console.error('Error extracting content from response:', error, data);
      return NextResponse.json(
        { content: "I apologize, but I encountered an unexpected response format. Please try again." }
      );
    }
    
    // Return the response
    return NextResponse.json({ content });
    
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 