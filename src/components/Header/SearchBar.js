import React, { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SearchBar = () => {
  const searchInputRef = useRef();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();


  const onSearchHandler = (e) => {
    e.preventDefault();
    const searchQuery = searchInputRef.current.value;
    const searchQueryCleaned = searchQuery.replace(/[^a-z0-9-]/g , "-");
    console.log(searchQueryCleaned);
    setSearchParams({search: searchQueryCleaned});
    //navigate(`/search/${searchQueryCleaned}`);
    searchInputRef.current.value = "";
  };

  return (
    <form onSubmit={onSearchHandler} className="search-form">
      <input type="text" className="search" ref={searchInputRef} placeholder="search" />
    </form>
  );
}