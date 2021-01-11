import React from "react";
import "./Button.scss"

interface IButton {
  children: string;
  className: string;
}

const Button = (props: IButton) => {
  const {children, className} = props
  return (
    <button className={className}>{children}</button>
  );
};

export default Button;
