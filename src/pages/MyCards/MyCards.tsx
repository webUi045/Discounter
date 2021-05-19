/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { RootState } from "../../store/reducers/rootReducer";
import Card from "../../shared/Card";
import { requestCards } from "../../store/reducers/cardsReducer";
import "./MyCards.scss";
import loader from "../../assets/images/loader.gif";
import CardForm from "../../shared/CardForm";

const MyCards = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { cards } = useSelector((state: RootState) => state.cardsReducer);
	const { isAuth, loading } = useSelector(
		(state: RootState) => state.profileReducer
	);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(requestCards());
	}, []);

	if (!isAuth && !loading) {
		return <Redirect exact to="/"></Redirect>;
	} else {
		const arr = [];
		for (let key in cards) {
			const { date, cardName, cardNumber, profit } = cards[key];
			arr.push(
				<Card
					key={key}
					name={cardName}
					date={date}
					cardNum={cardNumber}
					profit={profit}
				/>
			);
		}

		return (
			<div className="cardsList">
				<div onClick={() => setIsOpen(!isOpen)}>Add card</div>
				{isOpen && <CardForm />}
				{loading ? (
					<img className="cardsList__loader" src={loader} alt="loader" />
				) : arr.length !== 0 ? (
					arr.reverse()
				) : (
					<p className="cardsList__emptyCard">Please add your card</p>
				)}
			</div>
		);
	}
};

export default MyCards;
