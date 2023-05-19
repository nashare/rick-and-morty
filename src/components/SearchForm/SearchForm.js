import './SearchForm.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function SearchForm({ setSearchInput, setPage }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    event.persist();
    if (event.key === 'Enter') {
      setPage(1);
      setSearchInput(input);
      navigate('/search');
      setInput("");
    }
  };

  return (
    <div className="search-container">
      <input 
        className="search-input" 
        value={input} 
        placeholder="Search..."
        onChange={handleChange}
        onKeyUp={handleKeyPress}
      />
    </div>
  );
}

export default SearchForm;
