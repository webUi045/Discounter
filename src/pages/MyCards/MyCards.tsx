import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers/rootReducer";
import Card from "../../shared/Card";
import {ICard} from "../../store/actionTypes/cardsPayloadActionTypes"

const MyCards = () => {
    const dispatch = useDispatch();
    const { cards } = useSelector((state: RootState) => state.profileReducer.user);

    const arrCard: any = [];

    for (let key in cards) {
        arrCard.push(key);
    }
    
    return (
        <>
            {
                <div>
                    {arrCard.length !== 0 && arrCard.map((card: any) =>
                        <Card card={cards[card]} name={card} />
                    )}
                </div>
            }
        </>
    )
}

export default MyCards;