import './NavBar.css';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/">CHARACTERS</Link>
      <Link to="/locations">LOCATIONS</Link>
      <Link to="/episodes">EPISODES</Link>
    </nav>
  );
}

export default NavBar;
