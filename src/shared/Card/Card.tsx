import React from "react";
import "./Card.scss";
import { ICard } from "../../store/actionTypes/cardsPayloadActionTypes"
import Button from "../Button";

type PropsTypes = {
  card: ICard;
  name: string
}

const Card = ({card, name}: PropsTypes) => {

  return (
    <div className='card'>
      <div className='card__view'>
        <div className='card__name'>
          {name}
        </div>
        <div className='card__number'>
          {card.id}
        </div>
        <div className='card__date'>
          06/21
        </div>
      </div>
      <div className='card__profit'>
        <p className='card__profit-text'>
          Electronics, clothing and footwear, household appliances, auto goods, goods for home and business.
        </p>
        <Button className='card__btn_edit'>EDIT</Button>
        <Button className='card__btn_delete'>DELETE</Button>

      </div>
    </div>
  );
};

export default Card;