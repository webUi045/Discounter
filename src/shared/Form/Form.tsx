import React, { FormEvent } from "react";
import { useLocation } from "react-router";
import { IAddCard } from "../../store/actionTypes/cardsPayloadActionTypes";
import Button from "../Button";
import "./Form.scss";

interface IFormProps {
  name: string;
  children: React.ReactNode;
  onClick?(): void;
  onSubmit?(e: FormEvent, cardData?: IAddCard): void;
}

const Form = ({ name, onClick, onSubmit, children }: IFormProps) => {
  const location = useLocation()
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__header">
        <p className="form__name">{name}</p>
        {
          location.pathname !== "/mycards"
          && <Button className="btn-close" onClick={onClick}>
              &#10006;
            </Button>
        }
      </div>
      {children}
    </form>
  );
};

export default Form;