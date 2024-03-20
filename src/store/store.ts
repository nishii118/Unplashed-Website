import { configureStore } from '@reduxjs/toolkit';
import photoReducer from './photoSlice';
import userReducer from './userSlice';
export const store = configureStore({
  reducer: {
    photo: photoReducer,
    user: userReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch