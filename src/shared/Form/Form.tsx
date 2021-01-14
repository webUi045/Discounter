import React from "react";
import Button from "../Button";
import "./Form.scss";

interface IFormProps {
  name: string;
  onClick(): void;
  children: React.ReactNode;
}

const Form = ({ name, onClick, children }: IFormProps) => {
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <p>{name}</p>
      <Button className="btn-close" onClick={onClick}>
        &#10006;
      </Button>
      {children}
    </form>
  );
};

export default Form;
