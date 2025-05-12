import { NextResponse } from 'next/server';
import { auth } from './auth';
import { authRoutes, globalRoutes } from './routes';
import { Role } from '@prisma/client';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user.role === Role.ADMIN;
  const isProfileComplete = req.auth?.user.profileComplete;
  const isPublicRoute = globalRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  const isAdminRoutes = nextUrl.pathname.startsWith('/admin');

  if (isPublicRoute || isAdmin) {
    return NextResponse.next();
  }

  if (isAdminRoutes && !isAdmin) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/members', nextUrl));
    }
    return NextResponse.next();
  }
  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  if (
    isLoggedIn &&
    !isProfileComplete &&
    nextUrl.pathname !== '/complete-profile'
  ) {
    return NextResponse.redirect(new URL('/complete-profile', nextUrl));
  }

  if (
    isLoggedIn &&
    isProfileComplete &&
    nextUrl.pathname === '/complete-profile'
  ) {
    return NextResponse.redirect(new URL('/members', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
