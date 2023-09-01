import React, { useState } from 'react';
import './modify.css';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search products by product id..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button className='edit-btn' type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
