import {notFound} from 'next/navigation';
import {Locale, hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import {routing} from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import './styles.css';

// Sonner toast provider
import {Toaster} from 'sonner';

import {getLangDir} from 'rtl-detect';

// MUI imports
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import {Roboto} from 'next/font/google';
import {NextThemeConfigProvider, NextThemesProvider} from '@/next-theme';
import {CssBaseline} from '@mui/material';

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
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={direction}>
      <body lang={locale} className={roboto.variable}>
        <AppRouterCacheProvider options={{enableCssLayer: true}}>
          <NextIntlClientProvider>
            <NextThemesProvider>
              <NextThemeConfigProvider direction={direction}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Navigation />
                {children}

                <Toaster richColors position="top-right" />
              </NextThemeConfigProvider>
            </NextThemesProvider>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
