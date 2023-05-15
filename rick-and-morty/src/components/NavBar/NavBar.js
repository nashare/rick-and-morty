import './NavBar.css';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/" className="nav-link">CHARACTERS</Link>
      <Link to="/locations" className="nav-link">LOCATIONS</Link>
      <Link to="/episodes" className="nav-link">EPISODES</Link>
    </nav>
  );
}

export default NavBar;
