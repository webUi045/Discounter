import React from "react";
import { Link } from "react-router-dom";
import "./PrivateNav.scss";

const PrivateNav = () => {
  return (
    <>
      <Link to="/myCards" className="nav__link">
        My cards
      </Link>
      
        <Link to="/profile" className="nav__link">
          <span className="profile-link">P</span>
        </Link>
      
    </>
  );
};

export default PrivateNav;
