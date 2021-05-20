import React from "react";
import "./Card.scss";
import Button from "../Button";

type PropsTypes = {
  name: string;
  date: string;
  cardNumber: number;
  profit: string;
};

const Card = ({ name, date, cardNumber, profit }: PropsTypes) => {
  return (
    <div className="card">
      <div className="card__view">
        <div className="card__name">{name}</div>
        <div className="card__number">{cardNumber}</div>
        <div className="card__date">{date}</div>
      </div>
      <div className="card__profit">
        <p className="card__profit-text">{profit}</p>
        <div className="card__btns">
          <Button className="card__btn_edit">EDIT</Button>
          <Button className="card__btn_delete">DELETE</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
