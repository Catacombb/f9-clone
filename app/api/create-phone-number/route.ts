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
    
    // Get the assistant ID from the request body
    const { assistantId } = await request.json();
    
    if (!assistantId) {
      return NextResponse.json(
        { message: 'Assistant ID is required' },
        { status: 400 }
      );
    }
    
    // Create a new phone number with Vapi
    const response = await fetch('https://api.vapi.ai/phone-number', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "F9 Productions Phone Number",
        assistantId: assistantId
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Vapi API error:', data);
      return NextResponse.json(
        { message: data.message || 'Failed to create phone number' },
        { status: response.status }
      );
    }
    
    return NextResponse.json({
      message: 'Phone number created successfully',
      phoneNumberId: data.id,
      phoneNumber: data.twilioPhoneNumber || "Phone number not available yet"
    }, { status: 200 });
    
  } catch (error: unknown) {
    console.error('Error creating phone number:', error);
    
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 