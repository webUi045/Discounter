import React from "react";
import "./Button.scss"

interface IButton {
  children: string;
  styles: string;
}

const Button = (props: IButton) => {
  const {children, styles} = props
  return (
<button className={styles}>{children}</button>
  );
};

export default Button;
