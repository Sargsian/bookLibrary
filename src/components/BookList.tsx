import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { SearchDetails } from '../models/SearchDetails';
import { BookItem } from '../models/BookItem';
import { reFetchBooks } from '../store/reducers/ActionCreators';
import BookCard from './BookCard';
import classes from './BookList.module.scss';
import LoadingSpinner from './LoadingSpinner';
import LoadMoreSpinner from './LoadMoreSpinner';

interface BookListInterface {
  searchDetails: SearchDetails;
}

const BookList = (props: BookListInterface) => {
  const {
    volumeData,
    isLoading,
    error,
    refetchError,
    startIndex,
    refetchLoading,
  } = useAppSelector((state) => state.bookData);
  const dispatch = useAppDispatch();
  const { items, totalItems } = volumeData;

  const loadMore = () => {
    dispatch(reFetchBooks(props.searchDetails));
  };


  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <p>{error}</p>}
      {!isLoading && !volumeData.items && startIndex && <p>No results</p>}

      {volumeData.items && volumeData.items.length > 0 && !isLoading && (
        <>
          <p className={classes.searchResult}>{totalItems} results</p>
          <div className={classes.list}>
            {items.map((book: BookItem) => {
              return (
                <BookCard
                  key={book.id}
                  title={book.volumeInfo.title}
                  authors={book.volumeInfo.authors}
                  categories={book.volumeInfo.categories}
                  address={book.id}
                  src={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : undefined
                  }
                />
              );
            })}
          </div>
          {refetchError && <p>{refetchError}</p>}
          {refetchLoading ? (
            <LoadMoreSpinner />
          ) : (
            <button className={classes.loadMore} onClick={loadMore}>
              Load More
            </button>
          )}
        </>
      )}
    </>
  );
};

export default BookList;
