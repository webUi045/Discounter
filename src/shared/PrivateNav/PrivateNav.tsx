import React from "react";
import { Link } from "react-router-dom";

const PrivateNav = () => {
  return (
    <>
      <Link to="/myCards" className="nav__link">
        My cards
      </Link>
      <Link to="/profile" className="nav__link">
        <span>P</span>
      </Link>
    </>
  );
};

export default PrivateNav;
