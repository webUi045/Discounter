import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {requestCards} from "../../store/reducers/cardReducer"
import { RootState } from "../../store/reducers/rootReducer";
import Card from "../../shared/Card";
import {ICard} from "../../store/actionTypes/cardsPayloadActionTypes"

const MyCards = () => {
    const dispatch = useDispatch();
    const { cards } = useSelector((state: RootState) => state.cardsReducer);
    console.log(cards);
    useEffect(() => {
        dispatch(requestCards());
    }, [])

    return (
        <Card card={cards[0]} />
    )
}

export default MyCards;