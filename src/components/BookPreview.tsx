import classes from './BookPreview.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchBook } from '../store/reducers/ActionCreators';
import LoadingSpinner from './LoadingSpinner';
import { bookSlice } from '../store/reducers/BookSlice';
import BookCover from './BookCover';

const BookPreview = () => {
  const params = useParams().bookId;
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const { bookData, previewLoading, previewError } = useAppSelector(
    (state) => state.bookData
  );
  const {
    volumeInfo: { title, authors, categories, description, imageLinks },
  } = bookData;
  const { previewReset } = bookSlice.actions;

  useEffect(() => {
    if (params) {
      dispatch(fetchBook(params));
    }
    dispatch(previewReset());
  }, [params, dispatch, previewReset]);

  const isImage = imageLinks?.small;
  console.log(imageLinks);

  return (
    <>
      {previewLoading && <LoadingSpinner center={true} />}
      {previewError && <p>{previewError}</p>}
      {!previewLoading && !previewError && (
        <div className={classes.container}>
          <div className={classes.sidebar}>
            <div className={classes.test}>

            <div className={classes.imageContainer}>
              <BookCover imageLink={isImage} />
            </div>
            {/* <div
              className={`${classes.imageContainer} ${
                isImage && !imageIsLoaded && classes.skeleton
              }`}
            >
              {isImage ? (
                <span className={classes.skeleton}>
                  <div className={classes.image}>
                    <img
                      src={isImage}
                      alt='thumbnail'
                      onLoad={() => setImageIsLoaded(true)}
                    />
                  </div>
                </span>
              ) : (
                <div className={classes.bookCover}>Cover</div>
              )}
            </div> */}
          </div>
          </div>

          <div className={classes.main}>
            <div className={classes.categories}>{categories}</div>

            <div className={classes.title}>
              <h1>{title}</h1>
            </div>
            <div className={classes.authors}>
              {authors && authors.length >= 1 && (
                <i>
                  <span>{authors.join(', ')}</span>
                </i>
              )}
            </div>

            <div
              className={classes.desc}
              dangerouslySetInnerHTML={{
                __html: description || 'No Description',
              }}
            ></div>
            {/* {description} */}
          </div>
        </div>
      )}
    </>
  );
};

export default BookPreview;
