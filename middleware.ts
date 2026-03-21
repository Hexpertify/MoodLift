import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Redirect legacy/alternate paths to the canonical /games route
  if (pathname === '/games-and-activities' || pathname === '/games-and-activities/') {
    const destination = new URL('/games', url);
    destination.search = url.search;

    return NextResponse.redirect(destination, 301);
  }

  if (pathname === '/games&activities' || pathname === '/games%26activities') {
    const destination = new URL('/games', url);
    destination.search = url.search;

    return NextResponse.redirect(destination, 301);
  }

  if (pathname === '/all-activities/') {
    const destination = new URL('/all-activities', url);
    destination.search = url.search;

    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/games-and-activities',
    '/games-and-activities/',
    '/games&activities',
    '/games%26activities',
    '/all-activities/',
  ],
};
