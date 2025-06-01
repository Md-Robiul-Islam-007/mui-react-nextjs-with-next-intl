'use client';
import {useTranslations} from 'next-intl';
import PageLayout from './PageLayout';
import {Container, Typography} from '@mui/material';
import {useSession} from 'next-auth/react';
import Navigation from './Navigation';
import Footer from './footer';

export default function NotFoundPage() {
  const {data: session} = useSession();
  const t = useTranslations('NotFoundPage');

  return (
    <>
      {/* Navigation */}
      <Navigation session={session} />
      <PageLayout title={t('title')}>
        {/* Content */}
        <Container maxWidth="lg" sx={{mt: 2}}>
          <Typography className="max-w-[460px]">{t('description')}</Typography>
        </Container>
        {/* Footer */}
        <Footer />
      </PageLayout>
    </>
  );
}
