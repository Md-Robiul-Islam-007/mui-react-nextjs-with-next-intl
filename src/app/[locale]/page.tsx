import {Locale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import PageLayout from '@/components/PageLayout';
import {Container, Typography} from '@mui/material';

type Props = {
  params: Promise<{locale: Locale}>;
};

export default function IndexPage({params}: Props) {
  const {locale} = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('IndexPage');

  return (
    <PageLayout title={t('title')}>
      <Container maxWidth="lg">
        <Typography variant="body1">
          {t.rich('description', {
            code: (chunks) => (
              <code className="font-mono text-white">{chunks}</code>
            )
          })}
        </Typography>
      </Container>
    </PageLayout>
  );
}
