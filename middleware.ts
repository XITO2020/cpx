import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getDomain } from './lib/dns';

export function middleware(request: NextRequest) {
  const domain = getDomain(request);
  
  // Add custom headers based on domain
  const headers = new Headers(request.headers);
  headers.set('x-site-domain', domain || 'default');

  // Return response with modified headers
  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: '/:path*',
};