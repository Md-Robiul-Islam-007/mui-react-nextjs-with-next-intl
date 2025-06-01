// store/middleware.ts
import {Middleware} from '@reduxjs/toolkit';
import {saveSettingsToStorage} from '@/utils/settingsStorage';

export const persistSettingsMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    const state = store.getState();
    saveSettingsToStorage(state.settings);

    return result;
  };
