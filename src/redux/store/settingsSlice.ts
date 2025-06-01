// store/settingsSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadSettingsFromStorage} from '@/utils/settingsStorage';

type ThemeMode = 'light' | 'dark';
type ThemeColor = 'blue' | 'green' | 'red' | 'purple'; // extend as needed

interface SettingsState {
  open: boolean;
  themeMode: ThemeMode;
  primaryColor: ThemeColor;
  containerWidth: 'boxed' | 'full';
  sidebarColor: string;
}

const persisted = loadSettingsFromStorage();

const initialState: SettingsState = {
  open: false,
  themeMode: 'light',
  primaryColor: 'blue',
  containerWidth: 'full',
  sidebarColor: '#ffffff',
  ...persisted
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    setPrimaryColor: (state, action: PayloadAction<ThemeColor>) => {
      state.primaryColor = action.payload;
    },
    setContainerWidth: (state, action: PayloadAction<'boxed' | 'full'>) => {
      state.containerWidth = action.payload;
    },
    setSidebarColor: (state, action: PayloadAction<string>) => {
      state.sidebarColor = action.payload;
    },
    toggle: (state) => {
      state.open = !state.open;
    }
  }
});

// add middleware in your redux store
import {Middleware} from '@reduxjs/toolkit';

export const persistSettingsMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('appSettings', JSON.stringify(state.settings));
    return result;
  };

export const {
  setThemeMode,
  setPrimaryColor,
  setContainerWidth,
  setSidebarColor,
  toggle
} = settingsSlice.actions;

export default settingsSlice.reducer;
