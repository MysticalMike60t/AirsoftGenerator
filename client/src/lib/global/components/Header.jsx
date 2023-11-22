import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header" id="header">
      <ul>
        <li>
          <Link to="/">Placeholder</Link>
        </li>
        <li>
          <Link to="/">Placeholder</Link>
        </li>
        <li>
          <Link to="/">Placeholder</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
