'use client';
import {Box, Container, Typography} from '@mui/material';
import {ReactNode} from 'react';

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export default function PageLayout({children, title}: Props) {
  return (
    <>
      <Box sx={{py: 5, width: '100%', minHeight: '500px'}}>
        <Container maxWidth="lg">
          <Typography variant="h1" sx={{color: 'primary.main'}}>
            {title}
          </Typography>
        </Container>
        <Box>{children}</Box>
      </Box>
    </>
  );
}
