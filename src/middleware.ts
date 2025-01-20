import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const isOnboardingRoute = createRouteMatcher(['/onboarding']);
const isPublicRoute = createRouteMatcher(['/signin', '/signout', '/onboarding', '/landing', '/api/(.*)']);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  console.log('Request URL:', req.url); // Debugging line
  console.log('isOnboardingRoute:', isOnboardingRoute(req)); // Debugging line
  console.log('isPublicRoute:', isPublicRoute(req)); // Debugging line

  // For users visiting /onboarding, don't try to redirect
  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next();
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Redirect them to the /onboarding route to complete onboarding
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    console.log('Session Claims:', sessionClaims); // Debugging line
    const onboardingUrl = new URL('/onboarding', req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  // If the user is logged in and the route is protected, let them view.
  if (userId && !isPublicRoute(req)) {
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Always run for API routes
    '/api/(.*)', // Always match API routes
  ],
};
