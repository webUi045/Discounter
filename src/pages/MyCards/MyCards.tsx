import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { RootState } from "../../store/reducers/rootReducer";
import Card from "../../shared/Card";
import { requestCards } from "../../store/reducers/cardsReducer";
import "./MyCards.scss";

const MyCards = () => {
	const { cards } = useSelector((state: RootState) => state.cardsReducer);
	const { isAuth, loading } = useSelector((state: RootState) => state.profileReducer);
	const dispatch = useDispatch();

	const getCardsArray = () => {
		const arr = [];
		for (let key in cards) {
			const { date, cardName, cardNumber, profit } = cards[key];
			arr.push(<Card key={key} name={cardName} date={date} cardNum={cardNumber} profit={profit} />)
		}

		return arr;
	}

	useEffect(() => {
		dispatch(requestCards());
	}, [])

	if (!isAuth && !loading) {
		return (
			<Redirect exact to="/"></Redirect>
		)
	} else {
		const arrayCards = getCardsArray();

		return (
			<div className="cardsList"> 
				{arrayCards.length !== 0 ? arrayCards : 'Please add your card'}
			</div>
		)
	}
}

export default MyCards;