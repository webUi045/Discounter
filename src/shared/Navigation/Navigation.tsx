import React from "react";
import "./Navigation.scss"
import Reference from "../Reference";
import Button from "../Button";

const Navigation = () => (
  <nav>
    <Reference to="/AboutUs" styles="rightBorder">About us</Reference>
    <Reference to="/" styles="rightBorder link-on">News</Reference>
    <Reference to="/StoreList" styles="rightBorder">Store list</Reference>
    <Button styles="nav-button">Sign up</Button>
    <Button styles="nav-button">Sign in</Button>
  </nav>
);

export default Navigation;
