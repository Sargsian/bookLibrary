import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../models/Book';
import { Data } from '../../models/Data';
import { BookItem } from '../../models/BookItem';

interface BookState {
  volumeData: Data;
  bookData: BookItem;
  isLoading: boolean;
  error: string;
  refetchLoading: boolean;
  refetchError: string;
  previewLoading: boolean;
  previewError: string;
  startIndex: number;
}

const initialState: BookState = {
  volumeData: {
    items: [],
    totalItems: 0,
  },
  bookData: {
    id: '',
    volumeInfo: {
      title: '',
    },
  },
  isLoading: false,
  error: '',
  refetchLoading: false,
  refetchError: '',
  previewLoading: true,
  previewError: '',
  startIndex: 0,
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    booksFetching(state) {
      state.isLoading = true;
      state.startIndex = 0;
    },
    booksFetchingSuccess(state, action: PayloadAction<Data>) {
      state.isLoading = false;
      state.error = '';
      state.volumeData = action.payload;
      state.startIndex = 30;
    },
    booksFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    booksRefetching(state) {
      state.refetchLoading = true;
    },
    booksRefetchingSuccess(state, action: PayloadAction<Data>) {
      state.refetchLoading = false;
      state.refetchError = '';
      if (action.payload.items) {
        state.volumeData.items.push(...action.payload.items);
        state.startIndex += 30;
      }
    },
    booksRefetchingError(state, action: PayloadAction<string>) {
      state.refetchLoading = false;
      state.refetchError = action.payload;
    },
    previewFetching(state) {
      state.previewLoading = true;
    },
    previewFetchingSuccess(state, action: PayloadAction<BookItem>) {
      state.previewLoading = false;
      state.previewError = '';
      state.bookData = action.payload;
    },
    previewFetchingError(state, action: PayloadAction<string>) {
      state.previewLoading = false;
      state.previewError = action.payload;
    },
    previewReset(state) {
      state.bookData = {
        id: '',
        volumeInfo: {
          title: '',
        },
      };
    },
  },
});
 
export default bookSlice.reducer;
