import React, { useRef } from 'react';

import { useNavigate } from 'react-router-dom';

export const Search = () => {
    const history = useNavigate();

    const searchInputRef = useRef();
  
    const onSearchHandler = (e) => {
      e.preventDefault();
  
      const searchQuery = new URLSearchParams({
        name: searchInputRef.current.value
      }).toString();
  
      history.push(`/search/?${searchQuery}`);
    };
    return (
        <form onSubmit={onSearchHandler} className="search-form">
            <input type="text" className="search" ref={searchInputRef} placeholder="search" />
        </form>
    );
}