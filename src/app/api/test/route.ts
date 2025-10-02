import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Console log the test message
  console.log('🚀 Test message from GET endpoint!');
  console.log('Request received at:', new Date().toISOString());
  console.log('Request URL:', request.url);
  
  // Return a JSON response
  return NextResponse.json(
    { 
      message: 'Test endpoint working!', 
      timestamp: new Date().toISOString(),
      success: true
    },
    { status: 200 }
  );
}
