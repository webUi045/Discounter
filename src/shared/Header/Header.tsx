import React from "react";
import "./Header.scss";
import Logo from "../Logo";
import Navigation from "../Navigation";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="header">
    <div className="wrapper">
      <Link to="/">
        <figure className="header__logo">
          <Logo />
          <figcaption className="header__logo-name">Discounter</figcaption>
        </figure>
      </Link>
      <Navigation />
    </div>
  </header>
);

export default Header;
