import React, { useState } from 'react';
import { RootState } from "../../store/reducers/rootReducer";
import { useDispatch, useSelector } from 'react-redux';
import { IAddCard, requestAddCard } from '../../store/reducers/addCardReducer';

export default function CardForm() {
  const dispatch = useDispatch();
  const { uid } = useSelector((state: RootState) => state.profileReducer.user)
  const [ cardName, setCardName ] =  useState('');
	const [ cardNum, setCardNum ] = useState('');
	const [ date, setDate ] = useState('');
	const [ profit, setProfit ] = useState('');

  const cardData: IAddCard = {
    uid,
    cardName,
    cardNum: +cardNum,
    date,
    profit
  }

  const addCard = (e: React.FormEvent<EventTarget>, cardData: IAddCard): void => {
    e.preventDefault();
		dispatch(requestAddCard(cardData));
    setCardName('');
    setCardNum('');
    setDate('');
    setProfit('');
  } 

  return (
    <div>
      <form style={{display: "flex", flexDirection: 'column', width: '100px'}} onSubmit={(e) => addCard(e, cardData)}>
        <input type="text" value={cardName} placeholder="name" onChange={(e) => setCardName(e.target.value)} />
        <input type="text" value={cardNum} placeholder="number" onChange={(e) => setCardNum(e.target.value)} />
        <input type="text" value={date} placeholder="date" onChange={(e) => setDate(e.target.value)} />
        <textarea value={profit} placeholder="description" onChange={(e) => setProfit(e.target.value)} />
        <button type="submit">Add</button>
      </form>

    </div>
  )
}
