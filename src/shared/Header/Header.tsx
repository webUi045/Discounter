import React from "react";
import "./Header.scss";
import Logo from "../Logo";
import Navigation from "../Navigation";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="header">
    <div className="wrapper">
      <Link to="/">
        <div className="header__logo">
          <Logo />
          <span className="header__logo-name">Discounter</span>
        </div>
      </Link>
      <Navigation />
    </div>
  </header>
);

export default Header;
