import React from "react";
import "./Header.scss"
import Logo from "../Logo"
import Navigation from "../Navigation"

const Header = () => (
  <header>
    <div className="wrapper">
      <div className="logo">
        <Logo/>
        <span className="logo_name">Discounter</span>
      </div>
      <Navigation/>
    </div>
  </header>
);

export default Header;
