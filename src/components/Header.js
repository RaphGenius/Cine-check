import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/coup-de-coeur"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              Coup de coeur
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="container-title">
        <h1 className="title">
          <span className="cine">Cine</span>{" "}
          <span className="check">Check</span>
        </h1>
      </div>
    </div>
  );
};

export default Header;
