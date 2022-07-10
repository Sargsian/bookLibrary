import { useState } from 'react';
import classes from './BookCover.module.scss';

interface BookCoverProps {
  imageLink: string | undefined;
}

const BookCover = (props: BookCoverProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { imageLink } = props;

  return (
    <div className={classes.bookCover}>
      {imageLink && !isLoaded && <div className={classes.skeleton}></div>}

      {!imageLink && (
        <div className={classes.fallback}>
          <span>Book Cover</span>
        </div>
      )}
      {imageLink && (
        <div className={classes.thumbnail}>
          <img
            src={props.imageLink}
            alt='cover'
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      )}
    </div>
  );
};

export default BookCover;
