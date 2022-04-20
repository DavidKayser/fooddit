import React, { useEffect, useRef } from 'react';
import { selectReddits, selectIsLoading, selectLoadMore, loadReddits } from "../../features/reddits/redditsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const searchInputRef = useRef();
  const navigate = useNavigate();


  const onSearchHandler = (e) => {
    e.preventDefault();
    const searchQuery = searchInputRef.current.value;
    const searchQueryCleaned = searchQuery.replace(/[^a-z0-9-]/g , "-");
    console.log(searchQueryCleaned);
    navigate(`/search/${searchQueryCleaned}`);
    searchInputRef.current.value = "";
  };

  return (
    <form onSubmit={onSearchHandler} className="search-form">
      <input type="text" className="search" ref={searchInputRef} placeholder="search" />
    </form>
  );
}