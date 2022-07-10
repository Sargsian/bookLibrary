import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bookReducer from './reducers/BookSlice';
import modalReducer from './reducers/ModalSlice';

export const store = configureStore({
  reducer: {
    bookData: bookReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
