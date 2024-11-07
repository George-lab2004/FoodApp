import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <ul className="list-group">
      <li className="list-group-item">
        <Link to="/Register" className="nav-link">
          Register
        </Link>
      </li>
      <li className="list-group-item">
        <Link to="/Cat" className="nav-link">
          Categories
        </Link>
      </li>
      <li className="list-group-item">
        <Link to="/users" className="nav-link">
          Users
        </Link>
      </li>
      <li className="list-group-item">
        <Link to="/recipes" className="nav-link">
          Recipes
        </Link>
      </li>
      <li className="list-group-item">
        <Link to="/login" className="nav-link">
          login
        </Link>
      </li>
    </ul>
  );
}

// NavBar.jsx
