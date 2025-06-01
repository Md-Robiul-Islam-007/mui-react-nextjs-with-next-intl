'use client';
import {Typography} from '@mui/material';
import {useTranslations} from 'next-intl';

const PageBody = () => {
  const t = useTranslations('dashboard');
  return (
    <div>
      <Typography variant="h1">{t('title')}</Typography>
    </div>
  );
};

export default PageBody;
