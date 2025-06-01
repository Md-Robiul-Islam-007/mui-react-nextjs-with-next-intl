'use client';
import {
  Backdrop,
  CircularProgress,
  ThemeProvider,
  Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import NextTopLoader from 'nextjs-toploader';
import {useAppSelector} from '@/redux/hooks';
import {getTheme} from '@/theme';
import {useSession} from 'next-auth/react';
import {useRequireAuth} from '@/hooks/useRequireAuth';

export const ThemesProvider = ({children}: {children: React.ReactNode}) => {
  const {status} = useSession();
  const [mounted, setMounted] = useState(false);
  const {themeMode, primaryColor} = useAppSelector((state) => state.settings);
  useRequireAuth();

  useEffect(() => {
    setTimeout(() => setMounted(true), 1000);
    if (status === 'authenticated') {
      setMounted(false);
      setTimeout(() => setMounted(true), 1000);
    } else if (status === 'unauthenticated') {
      setMounted(false);
      setTimeout(() => setMounted(true), 1000);
    } else if (status === 'loading') {
      setMounted(false);
      setTimeout(() => setMounted(true), 1000);
    }
  }, [status]);

  const theme = getTheme(themeMode, resolvePrimaryColor(primaryColor)); // resolve hex from color name

  return (
    <ThemeProvider theme={theme}>
      {!mounted && (
        <Backdrop
          open
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: (theme) => theme.palette.background.default,
            color: (theme) => theme.palette.text.primary,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3
          }}
        >
          <Typography variant="h1">Template Forest</Typography>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {mounted && (
        <>
          {children}
          <NextTopLoader
            color={theme.palette.primary.main}
            shadow={`0 0 10px ${theme.palette.primary.main},0 0 5px ${theme.palette.primary.main}`}
            zIndex={1600}
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            showAtBottom={false}
          />
        </>
      )}
    </ThemeProvider>
  );
};

function resolvePrimaryColor(color: string): string {
  const colorMap: Record<string, string> = {
    blue: '#1976d2',
    green: '#2e7d32',
    red: '#d32f2f',
    purple: '#6a1b9a'
  };
  return colorMap[color] || '#1976d2';
}
