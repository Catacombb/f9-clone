import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get API key from environment variables
    const VAPI_API_KEY = process.env.VAPI_API_KEY;
    
    console.log('Environment variables:', {
      VAPI_API_KEY_EXISTS: !!VAPI_API_KEY,
      VAPI_API_KEY_LENGTH: VAPI_API_KEY ? VAPI_API_KEY.length : 0
    });
    
    if (!VAPI_API_KEY) {
      return NextResponse.json(
        { message: 'API key not configured' },
        { status: 500 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { name, phone } = body;
    
    console.log('Request body:', { name, phone: phone.substring(0, 3) + '***' });
    
    // Validate inputs
    if (!name || !phone) {
      return NextResponse.json(
        { message: 'Name and phone number are required' },
        { status: 400 }
      );
    }
    
    console.log('Making direct call with API key:', VAPI_API_KEY.substring(0, 5) + '***');
    
    const requestBody = {
      assistant: {
        name: "F9 Productions Assistant",
        firstMessage: `Hello ${name}, this is F9 Productions calling. Thank you for your interest in our services. How can we help you today?`,
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant for F9 Productions, an architecture firm. 
              You're speaking with ${name} who has requested information about our services.
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
        }
      },
      customer: {
        number: phone,
      }
    };
    
    console.log('Request payload:', JSON.stringify(requestBody, null, 2));
    
    // Make API call to Vapi
    const response = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    console.log('Response status:', response.status);
    
    const data = await response.json();
    console.log('Response data:', data);
    
    if (!response.ok) {
      console.error('Vapi API error:', data);
      return NextResponse.json(
        { message: data.message || 'Failed to initiate call' },
        { status: response.status }
      );
    }
    
    return NextResponse.json({
      message: 'Call initiated successfully',
      callId: data.id
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Error making call:', error);
    
    return NextResponse.json(
      { message: 'Internal server error', error: error.toString() },
      { status: 500 }
    );
  }
} 