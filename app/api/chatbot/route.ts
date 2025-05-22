import { NextRequest, NextResponse } from 'next/server';

// Define the expected request body type
interface ChatRequest {
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
}

// Define basic interfaces for model responses
interface ModelChoice {
  message?: { content?: string };
  content?: string;
  text?: string;
  output?: string;
  result?: string;
  answer?: string;
  response?: string;
  [key: string]: unknown;
}

interface ModelResponse {
  choices?: ModelChoice[];
  generated_text?: string;
  [key: string]: unknown;
}

// Helper to safely extract content from different model formats
function extractModelContent(data: unknown): string {
  try {
    // Type guard to ensure data is an object
    if (!data || typeof data !== 'object') {
      throw new Error('Response data is not an object');
    }
    
    const response = data as ModelResponse;
    
    // Standard OpenAI/Claude format
    if (response.choices && Array.isArray(response.choices) && response.choices.length > 0) {
      const choice = response.choices[0];
      
      // Check for message.content format
      if (choice.message && typeof choice.message.content === 'string') {
        return choice.message.content;
      }
      
      // Check for direct content property
      if (typeof choice.content === 'string') {
        return choice.content;
      }
      
      // Look for common content field names
      for (const key of ['text', 'output', 'result', 'answer', 'response']) {
        if (typeof choice[key] === 'string' && choice[key]) {
          return choice[key] as string;
        }
      }
      
      // Last resort - stringify the whole object
      return JSON.stringify(choice);
    }
    
    // Some models return direct text in generated_text
    if (typeof response.generated_text === 'string') {
      return response.generated_text;
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

    // Add an additional system message to reinforce staying on topic
    const messages = [...body.messages];
    if (messages.length > 0 && messages[0].role === 'system') {
      // Append to existing system message for stronger instruction
      messages[0].content += `\n\nIMPORTANT REMINDER: You must ONLY answer questions about F9 Productions, architecture, design, and related services. For any other topics, politely decline to answer and redirect the conversation back to architecture.`;
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
        messages: messages,
        temperature: 0.6, // Slightly lower temperature for more consistent, focused responses
        max_tokens: 1000,
        top_p: 0.9, // More focused sampling for better adherence to instructions
        stop_sequences: ["I apologize, but I cannot", "I'm sorry, but I cannot", "Sorry, I cannot"] // Prevent common refusal patterns
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
      let content = extractModelContent(data);
      
      // Check if response appears to be discussing off-topic subjects
      const offTopicIndicators = [
        "I cannot provide information about",
        "I don't have information on",
        "that falls outside my expertise",
        "I cannot discuss",
        "I'm not able to discuss",
        "I'm not programmed to"
      ];
      
      const architectureTerms = [
        "architecture", "design", "construction", "building", "home", "house", "renovation", 
        "remodel", "structure", "F9", "F14", "property", "residential", "commercial"
      ];
      
      // If the response contains refusal language but doesn't mention architecture terms, 
      // replace with F9-specific refusal
      if (offTopicIndicators.some(phrase => content.includes(phrase)) && 
          !architectureTerms.some(term => content.toLowerCase().includes(term))) {
        content = "I'm specialized in architectural services provided by F9 Productions. I'd be happy to discuss your architectural design needs, home renovations, commercial projects, or our design-build process instead. How can I assist you with your architectural project?";
      }
      
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