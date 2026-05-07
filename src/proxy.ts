// src/proxy.ts
import createMiddleware from 'next-intl/middleware';
 
export function proxy(request: Request) {
  return createMiddleware({
    locales: ['en', 'fr'],
    defaultLocale: 'en'
  })(request);
}
 
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};