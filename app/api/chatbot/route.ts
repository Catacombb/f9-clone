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

    // Get OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenAI API key is not configured');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: body.messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'Error communicating with OpenAI' },
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