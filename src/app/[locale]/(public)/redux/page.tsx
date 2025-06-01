import {Locale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import PageLayout from '@/components/PageLayout';
import {Container, Paper, Typography} from '@mui/material';
import {Counter} from '@/components/redux-state-component/Counter';
import Boolean from '@/components/redux-state-component/Boolean';

type Props = {
  params: Promise<{locale: Locale}>;
};

export default function ReduxPage({params}: Props) {
  const {locale} = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('ReduxPage');

  return (
    <PageLayout title={t('title')}>
      <Container maxWidth="lg">
        {t.rich('description', {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          )
        })}

        {/* Counter component */}
        <Paper
          sx={{
            p: 4,
            mt: 8,
            maxWidth: 400,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="h3" mb={2}>
            {t('counter.title')}
          </Typography>
          <Counter />
        </Paper>

        {/* Boolean component */}
        <Paper
          sx={{
            p: 4,
            mt: 4,
            maxWidth: 400,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="h3" mb={2}>
            {t('boolean.title')}
          </Typography>
          <Boolean />
        </Paper>
      </Container>
    </PageLayout>
  );
}
