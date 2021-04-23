import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../store/store";
import "./PrivateNav.scss";

const PrivateNav = () => {
  const { userPhoto } = useSelector((state: RootState) => state.profile.user);

  return (
    <>
      <Link to="/myCards" className="nav__link">
        My cards
      </Link>

      <Link to="/profile" className="nav__link">
        {
          userPhoto !== "" ? <div className="profile-img" style={{ backgroundImage: `url(${userPhoto})` }}></div> :
            <div className="profile-img" style={{ backgroundImage: `url(/images/user.svg)` }}></div>
        }
      </Link>
    </>
  );
};

export default PrivateNav;