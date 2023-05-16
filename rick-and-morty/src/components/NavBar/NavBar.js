import './NavBar.css';
import { Link } from "react-router-dom";
import SearchForm from '../SearchForm/SearchForm';

function NavBar({ setSearchCharacters, setError }) {
  return (
    <nav>
      <div className="nav-bar-links">
        <Link to="/" className="nav-link">CHARACTERS</Link>
        <Link to="/locations" className="nav-link">LOCATIONS</Link>
        <Link to="/episodes" className="nav-link">EPISODES</Link>
      </div>
      <SearchForm setSearchCharacters={setSearchCharacters} setError={setError}/>
    </nav>
  );
}

export default NavBar;
