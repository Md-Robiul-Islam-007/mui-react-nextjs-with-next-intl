import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest, NextResponse} from 'next/server';
import {auth} from '@/auth';
import {cookies} from 'next/headers';
// export {auth as middleware} from '@/auth';

export default createMiddleware(routing);

const PUBLIC_FILE = /\.(.*)$/;
const locales = routing.locales;
const defaultLocale = routing.defaultLocale;

const protectedRoutes = ['/dashboard'];

export async function middleware(req: NextRequest) {
  const {nextUrl} = req;
  const cookieHandler = await cookies();
  const pathname = nextUrl.pathname;
  const queryString = nextUrl.search; // Preserve query parameters
  const session = await auth();

  // Ignore API routes, Next.js internal files, and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Get the language from cookies
  const cookieLang = cookieHandler.get('NEXT_LOCALE')?.value || defaultLocale;

  // Extract language from the URL
  const pathnameParts = pathname.split('/');
  const pathLang = pathnameParts[1]; // First segment of the path

  // Define supported languages
  const pathSegments = pathname.split('/').filter(Boolean); // Remove empty segments

  // Check if the first segment is a valid language
  const hasLangPrefix = locales.includes(pathSegments[0] as 'en' | 'de');

  const proto = await req.headers.get('x-forwarded-proto');
  const host = await req.headers.get('host');
  const requestUrl = await `${proto}://${host}`;

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(`/${cookieLang}${path}`)
  );

  if (!session?.user && isProtected) {
    // Use cookie instead of header to avoid hydration mismatch issues
    // res.cookies.set('requires-auth', 'true', {path: '/'});
    cookieHandler.set('requires-auth', 'true', {path: '/'});

    return NextResponse.redirect(
      new URL(`${requestUrl}/${cookieLang}${queryString}`, req.url)
    );
  }

  // if pathname have `undefined` then return
  if (pathname.includes('undefined')) {
    return NextResponse.redirect(
      new URL(`${requestUrl}/${cookieLang}${queryString}`, req.url)
    );
  }

  // Detect duplicate language prefixes (e.g., /en/en/signin)
  if (
    hasLangPrefix &&
    pathSegments.length > 1 &&
    locales.includes(pathSegments[1] as 'en' | 'de')
  ) {
    // Redirect to the correct path with only one language prefix
    const correctedPath = `${requestUrl}/${pathSegments[0]}/${pathSegments.slice(2).join('/')}${queryString}`;
    return NextResponse.redirect(new URL(correctedPath, req.url), 308);
  }

  const hasLocale = locales.includes(pathLang as 'en' | 'de');

  if (!hasLocale) {
    // Redirect to the preferred language from cookies
    return NextResponse.redirect(
      new URL(`${requestUrl}/${cookieLang}/${pathname}${queryString}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: [
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)'
  ]
};
