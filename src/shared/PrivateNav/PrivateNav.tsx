import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar, { ConfigProvider } from "react-avatar";

import { RootState } from "../../store/reducers/rootReducer";
import "./PrivateNav.scss";

const PrivateNav = () => {
  const { userPhoto, firstName } = useSelector(
    (state: RootState) => state.profileReducer.user
  );

  return (
    <>
      <Link to="/mycards" className="nav__link">
        My cards
      </Link>

      <Link to="/profile" className="nav__link">
        {userPhoto !== "" ? (
          <div
            className="profile-img"
            style={{ backgroundImage: `url(${userPhoto})` }}
          ></div>
        ) : (
          firstName && (
            <ConfigProvider colors={["#e91e63", "#3f51b5", "#00bcd4"]}>
              <Avatar
                className="custom__avatar"
                name={firstName}
                round="50%"
                size="80"
              />
            </ConfigProvider>
          )
        )}
      </Link>
    </>
  );
};

export default PrivateNav;
