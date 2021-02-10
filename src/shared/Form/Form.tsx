import React, { FormEvent } from "react";
import Button from "../Button";
import "./Form.scss";

interface IFormProps {
  name: string;
  onClick(): void;
  children: React.ReactNode;
}

const Form = ({ name, onClick, children }: IFormProps) => {
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <div className="form__header">
        <p className="form__name">{name}</p>
        <Button className="btn-close" onClick={onClick}>
          &#10006;
        </Button>
      </div>
      {children}
    </form>
  );
};

export default Form;
