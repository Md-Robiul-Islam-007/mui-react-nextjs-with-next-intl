'use client';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment} from '@/redux/store/todosSlice';
import {RootState} from '@/redux/store';
import {Box, IconButton, Paper} from '@mui/material';
import IconifyIcon from '@/IconifyIcon';

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}
    >
      <IconButton
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1.5
        }}
      >
        <IconifyIcon icon="eva:minus-fill" />
      </IconButton>
      <Paper
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1.5,
          py: 0.5,
          px: 2
        }}
      >
        {count}
      </Paper>
      <IconButton
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1.5
        }}
      >
        <IconifyIcon icon="eva:plus-fill" />
      </IconButton>
    </Box>
  );
}
