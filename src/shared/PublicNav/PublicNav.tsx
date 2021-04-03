import React, {useState} from "react";
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
  firstNameError: string;
  lastNameError: string;
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
                     firstNameError,
                     lastNameError,
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
              <div className="data-input">
                <Input
                  value={firstName}
                  onChange={onChangeName}
                  type="text"
                  placeholder="Name"
                  style={"name-input"}
                />
                <p className="input-error">{firstNameError}</p>
              </div>
              <div className="data-input">
                <Input
                  value={lastName}
                  onChange={onChangeLastName}
                  type="text"
                  placeholder="Last Name"
                  style={"name-input"}
                />
                <p className="input-error">{lastNameError}</p>
              </div>
            </div>
            <div className="credentials-input-section">
              <Input
                value={email}
                onChange={onChangeEmail}
                type="email"
                placeholder="Email address"
                style={"credentials-input"}
              />
              <p className="input-error">{emailError}</p>
            </div>
            <div className="credentials-input-section">
              <Input
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder="Create Password"
                style={"credentials-input"}
              />
              <p className="input-error">{passwordError}</p>
            </div>
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
            <div className="credentials-input-section">
              <Input
                value={email}
                onChange={onChangeEmail}
                type="email"
                placeholder="Email address"
                style={"credentials-input"}
              />
              <Input
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder="Password"
                style={"credentials-input"}
              />
              {/* <p className="input-authorization-error">{authorizationError}</p> */}
            
            </div>
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