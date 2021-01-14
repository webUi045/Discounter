import React, { useEffect, useState } from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";
import fire from "../../firebaseConfig";
import PrivateNav from "../PrivateNav";
import PublicNav from "../PublicNav";

const Navigation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState<any>("");

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
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const writeUserData = (
    userId: string,
    userName: string,
    userLastName: string
  ) => {
    fire
      .database()
      .ref("Users/" + userId)
      .set({
        username: userName,
        userLastName: userLastName,
      });
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
        writeUserData(user.uid, firstName, lastName);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
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
      {!user ? (
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
