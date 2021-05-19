import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeEvery } from "redux-saga/effects";
import { IAddCard, requestAddCard } from "../reducers/addCardReducer";
import { addCard } from "../services/cardsServices";


function* addCardAsync(action: PayloadAction<IAddCard>) {
  const { uid, name, number, date, description } = action.payload
 try {
    yield call(addCard, uid, name, number, date, description) 
 } catch(err) {
   console.log(err)
 }
}

export function* addCardWatcher() {
  yield takeEvery(requestAddCard, addCardAsync)
}