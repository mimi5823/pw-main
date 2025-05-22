import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};

export function middleware(request: NextRequest) {
  // Check if the user has a Privy token in cookies
  const privyToken = request.cookies.get('privy-token');
  
  // If no token is found and the path is protected, redirect to the login page
  if (!privyToken && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}