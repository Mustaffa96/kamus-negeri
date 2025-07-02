import { configureStore } from '@reduxjs/toolkit';
import kamusReducer from './slices/kamusSlice';
import negeriReducer from './slices/negeriSlice';

export const store = configureStore({
  reducer: {
    kamus: kamusReducer,
    negeri: negeriReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
