import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { resetReddits } from "../../features/reddits/redditsSlice";

export const SearchBar = () => {
  const searchInputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSearchHandler = (e) => {
    e.preventDefault();
    dispatch(resetReddits());
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
