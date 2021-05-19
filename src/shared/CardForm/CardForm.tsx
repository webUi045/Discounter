import React, { useState } from 'react';
import { RootState } from "../../store/reducers/rootReducer";
import { useDispatch, useSelector } from 'react-redux';
import { IAddCard, requestAddCard } from '../../store/reducers/addCardReducer';

export default function CardForm() {
  const dispatch = useDispatch();
  const { uid } = useSelector((state: RootState) => state.profileReducer.user)
  const [ name, setName ] =  useState('');
	const [ number, setNumber ] = useState('');
	const [ date, setDate ] = useState('');
	const [ description, setDescription ] = useState('');

  const cardData: IAddCard = {
    uid: uid,
    name: name,
    number: +number,
    date: date,
    description: description
  }

  const addCard = (e: React.FormEvent<EventTarget>, cardData: IAddCard): void => {
    e.preventDefault()
		dispatch(requestAddCard(cardData))
  } 

  return (
    <div>
      <form style={{display: "flex", flexDirection: 'column', width: '100px'}} onSubmit={(e) => addCard(e,cardData)}>
        <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} />
        <input type="text" value={number} placeholder="number" onChange={(e) => setNumber(e.target.value)} />
        <input type="text" value={date} placeholder="date" onChange={(e) => setDate(e.target.value)} />
        <textarea value={description} placeholder="description" onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Add</button>
      </form>

    </div>
  )
}
