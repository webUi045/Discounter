import React, {SetStateAction, useState} from "react";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import "./PublicNav.scss";

interface IPublicNavProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  onChangeName(name: string): void;

  onChangeLastName(lastName: string): void;

  onChangeEmail(email: string): void;

  onChangePassword(password: string): void;

  emailError: string;
  passwordError: string;
  authorizationError: string;

  handleSignUp(): void;

  handleSignIn(): void;

  handleInputs(): void;
}

const PublicNav = ({
                     email,
                     password,
                     firstName,
                     lastName,
                     onChangeEmail,
                     onChangePassword,
                     emailError,
                     passwordError,
                     authorizationError,
                     handleSignUp,
                     handleSignIn,
                     handleInputs,
                     onChangeLastName,
                     onChangeName,
                   }: IPublicNavProps) => {
  const [isOpenSignIn, setIsOpenSignIn] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);

  const onClickHandlerSignIn = () => {
    setIsOpenSignIn(!isOpenSignIn);
  };

  const onClickHandlerSignUp = () => {
    setIsOpenSignUp(!isOpenSignUp);
  };

  const onClickCloseModalSignUp = () => {
    setIsOpenSignUp(false);
    handleInputs();
  };

  const onClickCloseModalSignIn = () => {
    setIsOpenSignIn(false);
    handleInputs();
  };

  return (
    <>
      <Button onClick={onClickHandlerSignUp} className="nav__button button">
        Sign up
      </Button>
      {isOpenSignUp && (
        <Modal onClick={onClickCloseModalSignUp} name="Sign up">
          <div className="signup-inputs">
            <div className="name-inputs">
              <Input
                value={firstName}
                onChange={onChangeName}
                type="text"
                placeholder="Name"
                style={"name-input"}
              />
              <Input
                value={lastName}
                onChange={onChangeLastName}
                type="text"
                placeholder="Last Name"
                style={"name-input"}
              />
            </div>

            <Input
              value={email}
              onChange={onChangeEmail}
              type="email"
              placeholder="Email address"
              style={"credentials-input"}
            />
            <p>{emailError}</p>
            <Input
              value={password}
              onChange={onChangePassword}
              type="password"
              placeholder="Create Password"
              style={"credentials-input"}
            />
            <p>{passwordError}</p>
            <Button onClick={handleSignUp} className="btn-form">
              Sign Up
            </Button>
          </div>
        </Modal>
      )}
      <Button onClick={onClickHandlerSignIn} className="nav__button button">
        Sign in
      </Button>
      {isOpenSignIn && (
        <Modal onClick={onClickCloseModalSignIn} name="Sign in">
          <div className="signin-inputs">
            <Input
              value={email}
              onChange={onChangeEmail}
              type="email"
              placeholder="Email address"
              style={"credentials-input"}
            />
            {/*<p>{emailError}</p>*/}
            <p></p>
            <Input
              value={password}
              onChange={onChangePassword}
              type="password"
              placeholder="Password"
              style={"credentials-input"}
            />
            <p style={{color: "red"}}>{authorizationError}</p>
            <Button onClick={handleSignIn} className="btn-form">
              Sign In
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PublicNav;
