import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bracketReducer, teamsReducer, uiReducer } from './store-slices';

export const store = configureStore({
  reducer: {
    bracket: bracketReducer,
    teams: teamsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializability checks
        ignoredActions: ['bracket/updateMatchup'],
        // Ignore these field paths in state for serializability checks
        ignoredPaths: ['bracket.currentBracket.matchups'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;