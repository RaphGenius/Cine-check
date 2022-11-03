import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ title }) => {
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <NavLink to="/">Accueil</NavLink>
          </li>
          <li>
            <NavLink to="/coup-de-coeur">Coup de coeur</NavLink>
          </li>
        </ul>
      </nav>
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
