'use client';
import {Box, Container, Grid, Typography} from '@mui/material';
import {ReactNode} from 'react';
import ExternalLink from '@/components/ExternalLink';
import {useTranslations} from 'next-intl';

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export default function PageLayout({children, title}: Props) {
  const t = useTranslations('PageLayout');
  return (
    <Box sx={{py: 5, width: '100%', minHeight: 'calc(100vh - 75px)'}}>
      <Container maxWidth="lg">
        <Typography variant="h1">{title}</Typography>
        <Box>{children}</Box>
        <Grid container sx={{mt: 'auto', pt: 10}} spacing={4}>
          <Grid size={{xs: 12, md: 6}}>
            <ExternalLink
              description={t('links.docs.description')}
              href={t('links.docs.href')}
              title={t('links.docs.title')}
            />
          </Grid>
          <Grid size={{xs: 12, md: 6}}>
            <ExternalLink
              description={t('links.source.description')}
              href={t('links.source.href')}
              title={t('links.source.title')}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
