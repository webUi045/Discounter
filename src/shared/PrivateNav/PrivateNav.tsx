import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IInitialState } from "../../store/reducers/discounterReducer";
import "./PrivateNav.scss";

const PrivateNav = () => {
  const { userPhoto } = useSelector(
    (state: { store: IInitialState }) => state.store.user
  );
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
