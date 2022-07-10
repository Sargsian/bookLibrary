import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { SearchDetails } from '../models/SearchDetails';
import { fetchBooks } from '../store/reducers/ActionCreators';
import classes from './Header.module.scss';

interface HeaderProps {
  setSearchDetails: (argument: SearchDetails) => void;
}

const Header = (props: HeaderProps) => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchTerm, setSearchTerm] = useState('');

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim().length === 0) return;
    let formattedCategory = category ? `+subject:${category}` : '';
    props.setSearchDetails({
      category: formattedCategory,
      sortBy,
      searchTerm,
      limit: 30,
    });
    dispatch(
      fetchBooks({
        category: formattedCategory,
        sortBy,
        searchTerm,
        limit: 30,
      })
    );
  };

  return (
    <div className={classes.header}>
      <h1>Online Library</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.search}>
          <div>
            <input
              type='name'
              placeholder='Search'
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <button className={classes.searchButton}>
              <img src={'/searchIcon.svg'} alt='icon' />
            </button>
          </div>
        </div>
        <div className={classes.options}>
          <div className={classes.option}>
            <label htmlFor='category'>Category</label>

            <select
              id='category'
              defaultValue=''
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='art'>Art</option>
              <option value='biography'>Biography</option>
              <option value='computers'>Computers</option>
              <option value='history'>History</option>
              <option value='medical'>Medical</option>
              <option value='poetry'>Poetry</option>
              <option value=''>All</option>
            </select>
          </div>
          <div className={classes.option}>
            <label htmlFor='cars'>Sort by</label>

            <select
              id='sort'
              defaultValue='relevance'
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value='newest'>Newest</option>
              <option value='relevance'>Relevance</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Header;
