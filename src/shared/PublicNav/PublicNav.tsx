import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";

interface IPublicNavProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  onChangeName(name: string): void;
  onChangeLastName(lastName: string): void;
  onChangeEmail(email: string): void;
  onChangePassword(password: any): void;
  emailError: string;
  passwordError: string;
  handleSignUp(): void;
  handleSignIn(): void;
  handleError(): void;
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
  handleSignUp,
  handleSignIn,
  handleError,
  handleInputs,
  onChangeLastName,
  onChangeName,
}: IPublicNavProps) => {
  const [isOpenSignIn, setIsOpenSignIn] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);

  const onClickHandlerSignIn = () => {
    setIsOpenSignIn(!isOpenSignIn);
    handleError();
    handleInputs();
  };

  const onClickHandlerSignUp = () => {
    setIsOpenSignUp(!isOpenSignUp);
    handleError();
    handleInputs();
  };

  return (
    <>
      <Button onClick={onClickHandlerSignUp} className="nav__button button">
        Sign up
      </Button>
      {isOpenSignUp && (
        <Modal onClick={() => setIsOpenSignUp(false)} name="Sign up">
          <div>
            <div>
              <Input
                value={firstName}
                onChange={onChangeName}
                type="text"
                placeholder="Name"
              />
              <Input
                value={lastName}
                onChange={onChangeLastName}
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div>
              <Input
                value={email}
                onChange={onChangeEmail}
                type="email"
                placeholder="Email address"
              />
              <p>{emailError}</p>
              <Input
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder="Create Password"
              />
              <p>{passwordError}</p>
            </div>
          </div>
          <Button onClick={handleSignUp} className="btn-form">
            Register
          </Button>
        </Modal>
      )}
      <Button onClick={onClickHandlerSignIn} className="nav__button button">
        Sign in
      </Button>
      {isOpenSignIn && (
        <Modal onClick={() => setIsOpenSignIn(false)} name="Sign in">
          <div>
            <Input
              value={email}
              onChange={onChangeEmail}
              type="email"
              placeholder="Email address"
            />
            <p>{emailError}</p>
            <Input
              value={password}
              onChange={onChangePassword}
              type="password"
              placeholder="Password"
            />
            <p>{passwordError}</p>
          </div>
          <Button onClick={handleSignIn} className="btn-form">
            Log In
          </Button>
        </Modal>
      )}
    </>
  );
};

export default PublicNav;
