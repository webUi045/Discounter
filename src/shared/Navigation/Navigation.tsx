import React, { useEffect, useState } from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";
import fire from "../../firebaseConfig";
import Test from "../Test";
import PrivateNav from "../PrivateNav";

const Navigation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <nav className="nav">
      <Link to="/AboutUs" className="nav__link">
        About us
      </Link>
      <Link to="/StoreList" className="nav__link">
        Store list
      </Link>
      {!user ? (
        <Test
          email={email}
          password={password}
          onChangeEmail={setEmail}
          onChangePassword={setPassword}
          emailError={emailError}
          passwordError={passwordError}
          handleSignIn={handleSignIn}
          handleSignUp={handleSignUp}
        />
      ) : (
        <PrivateNav />
      )}
    </nav>
  );
};

export default Navigation;
