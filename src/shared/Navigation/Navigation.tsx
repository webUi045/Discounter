import React, { useState } from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";
import PrivateNav from "../PrivateNav";
import PublicNav from "../PublicNav";
import { useDispatch, useSelector } from "react-redux";
import { requestAuthorization, clearErrors, requestRegistration } from "../../store/profile/reducer/reducer";
import { RootState } from "../../store/store";

const Navigation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const {isAuth, emailError, passwordError, authorizationError} = useSelector((state: RootState) => state.profile);
  const {firstNameError, lastNameError} = useSelector((state: RootState) => state.profile.user);

  const dispatch = useDispatch();
  
  const clearInputs = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    dispatch(clearErrors());
  };

  const handleSignIn = () => {
    dispatch(requestAuthorization({ email, password }));
  };

  const handleSignUp = () => {
    dispatch(requestRegistration({ email, password, firstName, lastName }));
  };

  return (
    <nav className="nav">
      <Link to="/aboutUs" className="nav__link">
        About us
      </Link>
      <Link to="/" className="nav__link">
        News
      </Link>
      <Link to="/storeList" className="nav__link">
        Store list
      </Link>
      {!isAuth ? (
        <PublicNav
          email={email}
          password={password}
          firstName={firstName}
          lastName={lastName}
          onChangeEmail={setEmail}
          onChangePassword={setPassword}
          onChangeName={setFirstName}
          onChangeLastName={setLastName}
          emailError={emailError}
          passwordError={passwordError}
          firstNameError={firstNameError}
          lastNameError={lastNameError}
          authorizationError={authorizationError}
          handleSignIn={handleSignIn}
          handleSignUp={handleSignUp}
          handleInputs={clearInputs}
        />
      ) : (
        <PrivateNav />
      )}
    </nav>
  );
};

export default Navigation;