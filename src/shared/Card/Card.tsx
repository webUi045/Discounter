import React from "react";
import "./Card.scss";
import { ICard } from "../../store/actionTypes/cardsPayloadActionTypes"
import Button from "../Button";

type PropsTypes = {
  name: string;
  date: string;
  cardNum: number;
  profit: string;
}

const Card = ({ name, date, cardNum, profit }: PropsTypes) => {

  return (
    <div className='card'>
      <div className='card__view'>
        <div className='card__name'>
          {name}
        </div>
        <div className='card__number'>
          {cardNum}
        </div>
        <div className='card__date'>
          {date}
        </div>
      </div>
      <div className='card__profit'>
        <p className='card__profit-text'>
          {profit}
        </p>
        <Button className='card__btn_edit'>EDIT</Button>
        <Button className='card__btn_delete'>DELETE</Button>
      </div>
    </div>
  );
};

export default Card;