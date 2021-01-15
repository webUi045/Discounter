import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import {
  initProfilePage,
  logOutSuccess,
  profileDataRequested,
} from "../../store/reducers/shopsReducer";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, email } = useSelector(
    (state: any) => state.store.user
  );

  const handleLogout = () => {
    dispatch(logOutSuccess());
  };

  useEffect(() => {
    dispatch(initProfilePage())
  }, []);

  return (
    <div className="profile">
      <div className="profile__img">
        <span className="logo">P</span>
      </div>
      <Input
        type="text"
        placeholder=""
        value={firstName}
        onChange={() => console.log("to be released...")}
        style={"profile__input"}
      />
      <Input
        type="text"
        placeholder=""
        value={lastName}
        onChange={() => console.log("to be released...")}
        style={"profile__input"}
      />

      <Input
        type="email"
        placeholder=""
        value={email}
        onChange={() => console.log("gg")}
        style={"profile__input"}
      />
      <div className="signout">
        <Link to="/">
          <Button onClick={handleLogout} className="btn-form">
            Sign out
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
