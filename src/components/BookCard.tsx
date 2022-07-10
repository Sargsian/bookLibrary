import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { BookCard } from '../models/Book';
import classes from './BookCard.module.scss';
import { toggle } from '../store/reducers/ModalSlice';

const Book = (props: BookCard) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { authors, categories, title, src, address } = props;

  return (
    <div className={classes.bookCard}>
      <Link
        to={address}
        state={{ background: location }}
        onClick={() => dispatch(toggle())}
      >
        <div className={classes.image}>
          <img src={src} alt='' />
          {!src && <div className={classes.bookCover}>Cover</div>}
        </div>
      </Link>
      <div className={classes.info}>
        <div className={classes.category}>
          <span>
            {categories && categories.length >= 1 && (
              <span>{categories[0]}</span>
            )}
          </span>
        </div>
        <div className={classes.name}>
          <Link
            to={address}
            state={{ backround: location }}
            onClick={() => dispatch(toggle())}
          >
            <span>{title}</span>
          </Link>
        </div>

        <div className={classes.author}>
          {authors && authors.length >= 1 && (
            <i>
              <span>{authors.join(', ')}</span>
            </i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;
