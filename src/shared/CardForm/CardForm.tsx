/* eslint-disable react/style-prop-object */
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { RootState } from "../../store/reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { ICard } from "../../store/actionTypes/cardsPayloadActionTypes";
import Form from "../Form";
import Input from "../Input";
import { requestAddCard } from "../../store/reducers/cardsReducer";
import "./CardForm.scss";

export default function CardForm() {
  const focusInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { uid } = useSelector((state: RootState) => state.profileReducer.user);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [profit, setProfit] = useState("");
  useEffect(() => {
    focusInputRef.current?.focus();
  }, []);

  const cardData: ICard = {
    cardName,
    cardNumber: +cardNumber,
    date,
    profit,
  };

  const addCard = (e: FormEvent, cardData: ICard): void => {
    e.preventDefault();
    dispatch(requestAddCard({ uid, card: cardData }));
    setCardName("");
    setCardNumber("");
    setDate("");
    setProfit("");
  };

  return (
    <div className="cardsListWrapper__form">
      <Form onSubmit={(e) => addCard(e, cardData)}>
        <Input
          value={cardName}
          type={"text"}
          placeholder={"Shop"}
          onChange={setCardName}
          style={"cardsListWrapper__inputName"}
          ref={focusInputRef}
        />
        <Input
          value={cardNumber}
          type={"text"}
          placeholder={"Number of your card"}
          onChange={setCardNumber}
          style={"cardsListWrapper__inputNumber"}
        />
        <Input
          value={date}
          type={"text"}
          placeholder={"Date"}
          onChange={setDate}
          style={"cardsListWrapper__inputDate"}
        />
        <textarea
          value={profit}
          placeholder="Description"
          onChange={(e) => setProfit(e.target.value)}
          className="cardsListWrapper__textareaProfit"
        />
        <Input
          type={"submit"}
          style={"cardsListWrapper__inputSubmit"}
          value={"ADD"}
        />
      </Form>
    </div>
  );
}
