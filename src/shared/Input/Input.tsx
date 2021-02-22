import React, { MutableRefObject } from "react";
import "./Input.scss";

interface IInputProps {
  value?: string,
  type: string,
  placeholder?: string,
  style: string,
  disabled?: boolean,
  id?: string,
  refInput?: MutableRefObject<HTMLInputElement | null>,

  onChange(term: string): void,

  onBlur?(): void,
}

const Input = ({ value, onChange, type, placeholder, style, disabled, onBlur, refInput, id }: IInputProps) => {

  return (
    <input
      autoComplete="true"
      type={type}
      name="input"
      className={style}
      value={value}
      ref={refInput}
      id={id}
      placeholder={placeholder}
      required
      disabled={disabled}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      onBlur={onBlur}
    />
  );
};

export default Input;