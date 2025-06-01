'use client';

import {
  Drawer,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  Typography,
  Box,
  Divider
} from '@mui/material';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {
  setThemeMode,
  setPrimaryColor,
  setContainerWidth,
  toggle
} from '@/redux/store/settingsSlice';

export default function SettingsDrawer() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);

  return (
    <Drawer
      anchor="right"
      open={settings.open}
      onClose={() => dispatch(toggle())}
    >
      <Box p={3} width={300}>
        <Typography variant="h6" gutterBottom>
          App Settings
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={settings.themeMode === 'dark'}
              onChange={(e) =>
                dispatch(setThemeMode(e.target.checked ? 'dark' : 'light'))
              }
            />
          }
          label="Dark Mode"
        />

        <Divider sx={{my: 2}} />

        <Typography gutterBottom>Primary Color</Typography>
        <RadioGroup
          value={settings.primaryColor}
          onChange={(e) => dispatch(setPrimaryColor(e.target.value as any))}
        >
          <FormControlLabel value="blue" control={<Radio />} label="Blue" />
          <FormControlLabel value="green" control={<Radio />} label="Green" />
          <FormControlLabel value="red" control={<Radio />} label="Red" />
          <FormControlLabel value="purple" control={<Radio />} label="Purple" />
        </RadioGroup>

        <Divider sx={{my: 2}} />

        <Typography gutterBottom>Container Width</Typography>
        <RadioGroup
          value={settings.containerWidth}
          onChange={(e) =>
            dispatch(setContainerWidth(e.target.value as 'full' | 'boxed'))
          }
        >
          <FormControlLabel
            value="full"
            control={<Radio />}
            label="Full Width"
          />
          <FormControlLabel value="boxed" control={<Radio />} label="Boxed" />
        </RadioGroup>

        {/* Additional settings like sidebar color can go here */}
      </Box>
    </Drawer>
  );
}
