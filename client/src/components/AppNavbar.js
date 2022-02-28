import React from "react";
import { Link } from "react-router-dom";

function AppNavbar() {
  return (
    <header className="appNavbar">
      <Link to="/">
        <h1 className="app__name">CLASS MANAGEMENT APP</h1>
      </Link>
    </header>
  );
}

export default AppNavbar;