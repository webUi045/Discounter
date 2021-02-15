import React, { MutableRefObject } from "react";
import "./Input.scss";
interface IInputProps {
  value?: string,
  refInput?: MutableRefObject<HTMLInputElement | null>,
  onChange(term: string): void,
  type: string,
  placeholder?: string,
  style: string,
  disabled?: boolean,
  onBlur?(): void,
  id?: string
}

const Input = ({ value, refInput, id, onChange, type, placeholder, style, disabled, onBlur }: IInputProps) => {
  return (
    <input
      type={type}
      name="input"
      className={style}
      value={value}
      ref={refInput}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      placeholder={placeholder}
      required
      disabled={disabled}
      onBlur={onBlur}
      id={id}
    />
  );
};

export default Input;
