import createMiddleware from 'next-intl/middleware';
 
const handleRequest = createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always'
});

// The function MUST be named 'proxy' to match the new convention
export default function proxy(request: any) {
  return handleRequest(request);
}
 
export const config = {
  // Match all pathnames except for the ones starting with:
  // - api (API routes)
  // - studio (Sanity CMS)
  // - _next (Next.js internals)
  // - static files (e.g. /favicon.ico, /images)
  matcher: ['/((?!api|studio|_next|.*\\..*).*)']
};
