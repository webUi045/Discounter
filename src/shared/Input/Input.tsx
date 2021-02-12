import React from "react";
import "./Input.scss";
interface IInputProps {
  autoFocus?: boolean
  value?: string,
  onChange(term: string): void,
  type: string,
  placeholder?: string,
  style: string,
  disabled?: boolean,
  onBlur?(): void,
}

const Input = ({ autoFocus, value, onChange, type, placeholder, style, disabled, onBlur }: IInputProps) => {
  return (
    <input
      autoFocus={autoFocus}
      type={type}
      name="input"
      className={style}
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      placeholder={placeholder}
      required
      disabled={disabled}
      onBlur={onBlur}
    />
  );
};

export default Input;
