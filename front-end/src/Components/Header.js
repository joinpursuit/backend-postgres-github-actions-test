import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import api from "../api";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    api.checkServerStatus().then(setIsConnected);
  }, []);

  return (
    <header>
      <nav>
        <h1>
          <NavLink to="/snacks">Snacks</NavLink>
          {isConnected && <span>Server is connected!</span>}
        </h1>
        <button>
          <NavLink to="/snacks/new">New Snack</NavLink>
        </button>
      </nav>
    </header>
  );
}
