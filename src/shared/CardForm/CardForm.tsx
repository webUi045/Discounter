/* eslint-disable react/style-prop-object */
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { RootState } from "../../store/reducers/rootReducer";
import { useDispatch, useSelector } from 'react-redux';
import { IAddCard } from '../../store/actionTypes/cardsPayloadActionTypes';
import Form from '../Form';
import Input from '../Input';
import { requestAddCard } from '../../store/reducers/cardsReducer';

export default function CardForm() {
  const focusInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { uid } = useSelector((state: RootState) => state.profileReducer.user)
  const [cardName, setCardName] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [date, setDate] = useState('');
  const [profit, setProfit] = useState('');
  useEffect(() => {
    focusInputRef.current?.focus()
  }, [])

  const cardData: IAddCard = {
    uid,
    cardName,
    cardNum: +cardNum,
    date,
    profit
  }

  const addCard = (e: FormEvent, cardData: IAddCard): void => {
    e.preventDefault();
    dispatch(requestAddCard(cardData));
    setCardName('');
    setCardNum('');
    setDate('');
    setProfit('');
  }

  return (
      <Form name={'Add card'} onSubmit={(e) => addCard(e, cardData)}>
        <Input
          value={cardName}
          type={"text"}
          placeholder={"name"}
          onChange={setCardName}
          style={"input__name__card"}
          ref={focusInputRef}
        />
        <Input
          value={cardNum}
          type={"text"}
          placeholder={"number"}
          onChange={setCardNum}
          style={"input__number__card"}
        />
        <Input
          value={date}
          type={"text"}
          placeholder={"date"}
          onChange={setDate}
          style={"input__date__card"}
        />
        <textarea
          value={profit}
          placeholder="description"
          onChange={(e) => setProfit(e.target.value)} 
          className="textarea__profit__card"
        />
        <Input
          type={"submit"}
          style={"input__submit__card"}
          value={"add card"}
        />
      </Form>
  )
}
