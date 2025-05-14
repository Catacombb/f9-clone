import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const VAPI_API_KEY = process.env.VAPI_API_KEY;
    
    if (!VAPI_API_KEY) {
      return NextResponse.json(
        { message: 'API key not configured' },
        { status: 500 }
      );
    }
    
    // Get data from request if needed
    const requestData = await request.json().catch(() => ({}));
    const customName = requestData.name || "F9 Productions Assistant";
    
    // Create a new assistant with Vapi
    const response = await fetch('https://api.vapi.ai/assistant', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: customName,
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant for F9 Productions, an architecture firm. 
              Be friendly, professional, and helpful. Answer questions about our architectural services,
              design process, and how we work with clients. If they ask about pricing, explain that
              it varies by project scope and you'd be happy to arrange a consultation with one of our architects.
              Keep responses concise and conversational as this is a phone call.`
            }
          ]
        },
        voice: {
          provider: "11labs",
          voiceId: "ryan" // Using a professional-sounding voice
        },
        firstMessage: "Hello {{name}}, this is F9 Productions calling. Thank you for your interest in our services. How can we help you today?"
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Vapi API error:', data);
      return NextResponse.json(
        { message: data.message || 'Failed to create assistant' },
        { status: response.status }
      );
    }
    
    return NextResponse.json({
      message: 'Assistant created successfully',
      assistantId: data.id
    }, { status: 200 });
    
  } catch (error: unknown) {
    console.error('Error creating assistant:', error);
    
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 