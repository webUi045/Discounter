import React, { useEffect, useState } from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";
import fire from "../../firebaseConfig";
import PrivateNav from "../PrivateNav";
import PublicNav from "../PublicNav";
import { useDispatch, useSelector } from "react-redux";
import {
  authorizeRequested,
  registerRequested,
} from "../../store/reducers/shopsReducer";

const Navigation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState<any>("");
  const isAuth = useSelector((state: any) => state.store.isAuth);
  const dispatch = useDispatch();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleSignIn = () => {
    clearErrors();
    dispatch(authorizeRequested({ email, password }));
  };

  const handleSignUp = () => {
    clearErrors();
    dispatch(registerRequested({ email, password, firstName, lastName }));
  };

  const authCheck = () => {
    // fire.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     clearInputs();
    //     setUser(user);
    //   } else {
    //     setUser("");
    //   }
    // });
  };

  useEffect(() => {
    authCheck();
  }, [firstName, lastName]);

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
          handleSignIn={handleSignIn}
          handleSignUp={handleSignUp}
          handleError={clearErrors}
          handleInputs={clearInputs}
        />
      ) : (
        <PrivateNav />
      )}
    </nav>
  );
};

export default Navigation;
