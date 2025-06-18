import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import bracketReducer from './slices/bracketSlice';
import teamsReducer from './slices/teamsSlice';
import uiReducer from './slices/uiSlice';

/**
 * Configure the Redux store with all reducers
 */
export const store = configureStore({
  reducer: {
    bracket: bracketReducer,
    teams: teamsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Redux types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;