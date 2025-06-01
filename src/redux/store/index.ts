import {configureStore} from '@reduxjs/toolkit';
import counterSlice from './todosSlice';
import booleanSlice from './booleanSlice';
import signInModel from './signInModel';
import settingsSlice from './settingsSlice';
import {persistSettingsMiddleware} from './middleware';

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice,
      boolean: booleanSlice,
      signInModel: signInModel,
      settings: settingsSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(persistSettingsMiddleware)
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
