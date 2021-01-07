import React from "react";
import "./Navigation.scss"
import Button from "../Button";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav className="nav">
    <Link to="/AboutUs" className="nav__link">About us</Link>
    <Link to="/News" className="nav__link nav__link_active">News</Link>
    <Link to="/StoreList" className="nav__link">Store list</Link>
    <Button styles="nav__button button">Sign up</Button>
    <Button styles="nav__button button">Sign in</Button>
  </nav>
);

export default Navigation;
