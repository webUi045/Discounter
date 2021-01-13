import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";

interface IPublicNavProps {
  email: string;
  password: string;
  onChangeEmail(email: string): void;
  onChangePassword(password: any): void;
  emailError: string;
  passwordError: string;
  handleSignUp(): void;
  handleSignIn(): void;
}

const PublicNav = ({
  email,
  password,
  onChangeEmail,
  onChangePassword,
  emailError,
  passwordError,
  handleSignUp,
  handleSignIn,
}: IPublicNavProps) => {
  const [isOpenSignIn, setIsOpenSignIn] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <>
      <Button
        onClick={() => setIsOpenSignUp(!isOpenSignUp)}
        className="nav__button button"
      >
        Sign up
      </Button>
      {isOpenSignUp && (
        <Modal onClick={() => setIsOpenSignUp(false)} name="Sign up">
          <div>
            <div>
              <Input
                value={firstName}
                onChange={setFirstName}
                type="text"
                placeholder="Name"
              />
              <Input
                value={lastName}
                onChange={setLastName}
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
      <Button
        onClick={() => setIsOpenSignIn(!isOpenSignIn)}
        className="nav__button button"
      >
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
            Sign In
          </Button>
        </Modal>
      )}
    </>
  );
};

export default PublicNav;
