// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/store/slicers/testSlice'; // Adjust the import path as necessary

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Types for TypeScript (optional)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
