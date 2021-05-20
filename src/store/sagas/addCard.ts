import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeEvery } from "redux-saga/effects";
import { IAddCard } from "../actionTypes/cardsPayloadActionTypes";
import { requestAddCard } from "../reducers/cardsReducer";
import { addCard } from "../services/cardsServices";
import { requestCardsSaga } from "./cardsSaga";


function* addCardAsync(action: PayloadAction<IAddCard>) {
  const { uid, cardName, cardNum, date, profit } = action.payload
 try {
    yield call(addCard, uid, cardName, cardNum, date, profit); 
    yield call(requestCardsSaga);
 } catch(err) {
   console.log(err)
 }
}

export function* addCardWatcher() {
  yield takeEvery(requestAddCard, addCardAsync)
}