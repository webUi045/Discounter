import React from "react";
import { Link } from "react-router-dom";

const PrivateNav = () => {
  return (
    <>
      <Link to="/MyCards" className="nav__link">
        My cards
      </Link>
      <Link to="/ProfilePage" className="nav__link">
        <span>V</span>
      </Link>
    </>
  );
};

export default PrivateNav;
