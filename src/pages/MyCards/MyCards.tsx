import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers/rootReducer";
import Card from "../../shared/Card";
import { requestCards } from "../../store/reducers/cardsReducer";

const MyCards = () => {

	const { cards } = useSelector((state: RootState) => state.cardsReducer);
	const { user, isAuth } = useSelector((state: RootState) => state.profileReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(requestCards(user.uid))
	}, [cards.length])

	return (
		<div>
			{
				isAuth
					?
					cards.length !== 0 && cards.map((card) =>
						<Card name={card.cardName} date={card.date} cardNum={card.cardNumber} profit={card.profit} />
					) : <div> please to login</div>
			}
		</div>
	)
}

export default MyCards;