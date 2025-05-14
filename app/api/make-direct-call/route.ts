import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get API key from environment variables
    const VAPI_API_KEY = process.env.VAPI_API_KEY;
    const PHONE_NUMBER_ID = process.env.VAPI_PHONE_NUMBER_ID;
    const ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID;
    
    console.log('Environment variables:', {
      VAPI_API_KEY_EXISTS: !!VAPI_API_KEY,
      VAPI_API_KEY_LENGTH: VAPI_API_KEY ? VAPI_API_KEY.length : 0,
      PHONE_NUMBER_ID: PHONE_NUMBER_ID,
      ASSISTANT_ID: ASSISTANT_ID
    });
    
    if (!VAPI_API_KEY) {
      return NextResponse.json(
        { message: 'API key not configured' },
        { status: 500 }
      );
    }
    
    if (!PHONE_NUMBER_ID) {
      return NextResponse.json(
        { message: 'Phone Number ID not configured' },
        { status: 500 }
      );
    }
    
    if (!ASSISTANT_ID) {
      return NextResponse.json(
        { message: 'Assistant ID not configured' },
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
    
    console.log('Making call with API key:', VAPI_API_KEY.substring(0, 5) + '***');
    
    // Create the request payload according to Vapi's API documentation
    const requestBody = {
      phoneNumberId: PHONE_NUMBER_ID,
      assistantId: ASSISTANT_ID,
      customer: {
        number: phone,
      },
      assistantOverrides: {
        variableValues: {
          name: name
        },
        firstMessage: `Hello ${name}, this is F9 Productions calling. Thank you for your interest in our services. How can we help you today?`
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