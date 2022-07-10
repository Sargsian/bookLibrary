import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BookList from '../components/BookList';
import Header from '../components/Header';
import { SearchDetails } from '../models/SearchDetails';

const HomePage = () => {
  const [searchDetails, setSearchDetails] = useState<SearchDetails>({
    category: 'history',
    sortBy: 'relevance',
    searchTerm: 'nigger',
    limit: 30,
  });
  return (
    <>
      <Header setSearchDetails={setSearchDetails} />
      <BookList searchDetails={searchDetails} />
      <Outlet />
    </>
  );
};

export default HomePage;
