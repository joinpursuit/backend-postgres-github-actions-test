import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <h1>
          <NavLink to="/snacks">Snacks</NavLink>
        </h1>
        <button>
          <NavLink to="/snacks/new">New Snack</NavLink>
        </button>
      </nav>
    </header>
  );
}
