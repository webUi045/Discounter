import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";

import { RootState } from "../../store/reducers/rootReducer";
import Card from "../../shared/Card";
import { requestCards } from "../../store/reducers/cardsReducer";

const MyCards = () => {

	const { cards } = useSelector((state: RootState) => state.cardsReducer);
	const { user, isAuth } = useSelector((state: RootState) => state.profileReducer);
	const dispatch = useDispatch();
	console.log(user);
	console.log(cards);
	
	
	const arr = [];

	for (let key in cards) {
		const { date, cardName, cardNumber, profit } = cards[key];
		arr.push(<Card key={key} name={cardName} date={date} cardNum={cardNumber} profit={profit} />)
	}

	useEffect(() => {
		dispatch(requestCards(user.uid));
	}, [])

	if (!isAuth) {
		return (
			<Redirect exact to="/"></Redirect>
		)
	} else {
		return (
			<div>
				{arr.length !== 0 ? arr : 'Please add your card'}
			</div>
		)
	}
}

export default MyCards;