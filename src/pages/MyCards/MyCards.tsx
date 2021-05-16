import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducer";
import Card from "../../shared/Card";

const MyCards = () => {
	const { cards } = useSelector((state: RootState) => state.profileReducer.user);
	const arrCard: Array<string> = [];
	for (let key in cards) {
		arrCard.push(key);
	}

	return (
		<div>
			{arrCard.length !== 0 && arrCard.map((card: any) =>
				<Card card={cards[card]} name={card} />
			)}
		</div>
	)
}

export default MyCards;