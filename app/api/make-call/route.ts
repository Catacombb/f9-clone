import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get API key and IDs from environment variables
    const VAPI_API_KEY = process.env.VAPI_API_KEY;
    const PHONE_NUMBER_ID = "6da3af74-0ee7-433f-a5e6-8d7e1952809c"; // Using the API key as a placeholder since we don't have actual IDs
    const ASSISTANT_ID = "6da3af74-0ee7-433f-a5e6-8d7e1952809c"; // Using the API key as a placeholder since we don't have actual IDs
    
    if (!VAPI_API_KEY) {
      return NextResponse.json(
        { message: 'API key not configured' },
        { status: 500 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { name, phone } = body;
    
    // Validate inputs
    if (!name || !phone) {
      return NextResponse.json(
        { message: 'Name and phone number are required' },
        { status: 400 }
      );
    }
    
    console.log('Making call with API key:', VAPI_API_KEY);
    
    // Make API call to Vapi
    const response = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumberId: PHONE_NUMBER_ID,
        assistantId: ASSISTANT_ID,
        // Using variableValues to pass the name to the assistant
        assistantOverrides: {
          variableValues: {
            name: name
          },
          firstMessage: `Hello {{name}}, this is F9 Productions calling. Thank you for your interest in our services. How can we help you today?`,
        },
        customer: {
          number: phone,
        }
      }),
    });
    
    const data = await response.json();
    
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