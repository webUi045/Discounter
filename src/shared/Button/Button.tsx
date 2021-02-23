import React from "react";
import "./Button.scss";

interface IButton {
  children: string | JSX.Element;
  className: string;

  onClick?(): void;
}

const Button = (props: IButton) => {
  const {children, className, onClick} = props;

  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;