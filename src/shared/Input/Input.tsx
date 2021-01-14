import React from "react";

interface IInputProps {
  value: any;
  onChange(term: string): void;
  type: string;
  placeholder: string;
}

const Input = ({ value, onChange, type, placeholder }: IInputProps) => {
  return (
    <input
      type={type}
      name="input"
      className="input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required
    ></input>
  );
};

export default Input;
