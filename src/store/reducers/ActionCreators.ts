import { AppDispatch } from '../store';
import axios, { AxiosError } from 'axios';
import { bookSlice } from './BookSlice';
import { store } from '../store';
import { SearchDetails } from '../../models/SearchDetails';
import { Data } from '../../models/Data';
import { BookItem } from '../../models/BookItem';

const {
  booksFetching,
  booksFetchingError,
  booksFetchingSuccess,
  booksRefetchingError,
  booksRefetching,
  booksRefetchingSuccess,
  previewFetching,
  previewFetchingError,
  previewFetchingSuccess,
} = bookSlice.actions;

export const fetchBooks =
  (details: SearchDetails) => async (dispatch: AppDispatch) => {
    try {
      dispatch(booksFetching());
      const startIndex = store.getState().bookData.startIndex;
      const response = await axios.get<Data>(
        `https://www.googleapis.com/books/v1/volumes?q=${details.searchTerm}${details.category}&key=AIzaSyB--_EZX7gewX6rEAdQcyC49mE-hLwufY4&startIndex=${startIndex}&orderBy=${details.sortBy}&maxResults=${details.limit}`
      );
      dispatch(booksFetchingSuccess(response.data));
    } catch (error) {
      dispatch(booksFetchingError((error as AxiosError).message));
    }
  };

export const reFetchBooks =
  (details: SearchDetails) => async (dispatch: AppDispatch) => {
    const startIndex = store.getState().bookData.startIndex;
    try {
      dispatch(booksRefetching());
      const response = await axios.get<Data>(
        `https://www.googleapis.com/books/v1/volumes?q=${details.searchTerm}${details.category}&key=AIzaSyB--_EZX7gewX6rEAdQcyC49mE-hLwufY4&startIndex=${startIndex}&orderBy=${details.sortBy}&maxResults=${details.limit}`
      );
      dispatch(booksRefetchingSuccess(response.data));
    } catch (error) {
      dispatch(booksRefetchingError((error as AxiosError).message));
    }
  };

export const fetchBook = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(previewFetching());
    const response = await axios.get<BookItem>(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
    dispatch(previewFetchingSuccess(response.data));
  } catch (error) {
    dispatch(previewFetchingError((error as AxiosError).message));
  }
};
