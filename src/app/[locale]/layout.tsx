import {notFound} from 'next/navigation';
import {Locale, hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import {routing} from '@/i18n/routing';
import './styles.css';

// Sonner toast provider
import {Toaster} from 'sonner';

import {getLangDir} from 'rtl-detect';
import {SessionProvider} from 'next-auth/react';

// MUI imports
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import {Roboto} from 'next/font/google';
import {ThemesProvider} from '@/context/ThemesProvider';
import {CssBaseline} from '@mui/material';
import StoreProvider from '@/redux/StoreProvider';
import {auth} from '@/auth';
import SignInPopup from '@/components/sign-in-popup';
import SettingsDrawer from '@/components/SettingsDrawer';

type Props = {
  children: ReactNode;
  params: Promise<{locale: Locale}>;
};

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const {locale} = await props.params;

  const t = await getTranslations({locale, namespace: 'LocaleLayout'});

  return {
    title: t('title')
  };
}

export default async function LocaleLayout({children, params}: Props) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  const direction = getLangDir(locale);
  const session = await auth();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <StoreProvider>
      <html lang={locale} dir={direction} suppressHydrationWarning>
        <body lang={locale} className={roboto.variable}>
          <NextIntlClientProvider locale={locale}>
            <AppRouterCacheProvider options={{enableCssLayer: false}}>
              <SessionProvider session={session}>
                <ThemesProvider>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />

                  {children}

                  <Toaster richColors position="top-right" />

                  {/* SignIn popup */}
                  <SignInPopup locale={locale} />

                  {/* Settings drawer */}
                  <SettingsDrawer />
                </ThemesProvider>
              </SessionProvider>
            </AppRouterCacheProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
