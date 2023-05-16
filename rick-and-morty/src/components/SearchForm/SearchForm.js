import './SearchForm.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function SearchForm({ setSearchCharacters }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    event.persist();
    if (event.key === 'Enter') {
      handleSearch();
      setInput("");
    }
  };

  const handleSearch = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${input}`);
        const data = await response.json();
        setSearchCharacters(data.results);
        navigate('/search');
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <div className="search-container">
      <input 
        className="search-input" 
        value={input} 
        placeholder="Search..."
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default SearchForm;
