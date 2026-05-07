import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
 
export const config = {
  // Exclude /studio and API routes from the locale middleware
  matcher: ['/((?!api|studio|_next|.*\\..*).*)']
};