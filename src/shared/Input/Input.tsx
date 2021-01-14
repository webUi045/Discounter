import React from "react";
import "./Input.scss";
interface IInputProps {
  value: any;
  onChange(term: string): void;
  type: string;
  placeholder: string;
  style: string;
}

const Input = ({ value, onChange, type, placeholder, style }: IInputProps) => {
  return (
    <input
      type={type}
      name="input"
      className={style}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required
    ></input>
  );
};

export default Input;
