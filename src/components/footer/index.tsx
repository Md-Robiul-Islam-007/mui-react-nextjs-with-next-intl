'use client';
import {Container, Grid} from '@mui/material';
import ExternalLink from '../ExternalLink';
import {useTranslations} from 'next-intl';

const Footer = () => {
  const t = useTranslations('PageLayout');

  return (
    <Container maxWidth="lg">
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
  );
};

export default Footer;
