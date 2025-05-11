import { NextResponse } from 'next/server';
import { auth } from './auth';
import { authRoutes, globalRoutes } from './routes';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isProfileComplete = req.auth?.user.profileComplete;
  const isPublicRoute = globalRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  if (isPublicRoute) {
    return NextResponse.next();
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
