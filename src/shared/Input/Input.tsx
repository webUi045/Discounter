import React from "react";
import "./Input.scss";

interface IInputProps {
  value?: string;
  type: string;
  placeholder?: string;
  style: string;
  disabled?: boolean;
  id?: string;
  onChange?(term: string): void;
  onBlur?(): void;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(({ value, onChange, type, placeholder, style, disabled, onBlur, id }, ref) => {

  return (
    <input
      autoComplete="true"
      type={type}
      name="input"
      className={style}
      value={value}
      ref={ref}
      id={id}
      placeholder={placeholder}
      required
      disabled={disabled}
      onChange={(e) => {
        onChange?.call(null, e.target.value)
      }}
      onBlur={onBlur}
    />
  );
})

export default Input;