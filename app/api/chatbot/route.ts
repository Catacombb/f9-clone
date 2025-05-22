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
        model: process.env.OPENROUTER_MODEL || 'mistralai/mistral-7b-instruct', // Using Mistral 7B Instruct model
        messages: body.messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      return NextResponse.json(
        { error: 'Error communicating with OpenRouter' },
        { status: 500 }
      );
    }

    // Parse the response
    const data = await response.json();
    
    // Return the response
    return NextResponse.json({
      content: data.choices[0].message.content
    });
    
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 