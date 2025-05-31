'use client';
import {Paper, Typography, useTheme} from '@mui/material';

type Props = {
  title: string;
  description: string;
  href: string;
};

export default function ExternalLink({description, href, title}: Props) {
  const theme = useTheme();

  return (
    <Paper
      component="a"
      sx={{
        display: 'block',
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: 3,
        p: 3,
        transition: 'border-color 0.2s ease-in-out',
        ':hover': {
          borderColor: theme.palette.primary.main
        }
      }}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <Typography variant="h3" mb={1}>
        {title} <span className="ml-2 inline-block">→</span>
      </Typography>
      <Typography variant="body1" sx={{color: 'text.secondary'}}>
        {description}
      </Typography>
    </Paper>
  );
}
