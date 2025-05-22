import { NextRequest, NextResponse } from 'next/server';
import { PRIVY_APP_SECRET, PRIVY_JWKS_URL } from '@/lib/privy-server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

    // Verify the token with Privy
    const response = await fetch('https://auth.privy.io/api/v1/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${PRIVY_APP_SECRET}:`).toString('base64')}`
      },
      body: JSON.stringify({ token })
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: 'Invalid token', details: error }, { status: 401 });
    }

    const userData = await response.json();
    return NextResponse.json({ verified: true, user: userData });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ error: 'Failed to verify token' }, { status: 500 });
  }
}