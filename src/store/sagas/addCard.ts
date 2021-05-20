import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { ICard } from "../actionTypes/cardsPayloadActionTypes";
import {
  requestAddCardSuccessful,
  requestAddCard,
  requestCardsFailed,
} from "../reducers/cardsReducer";
import { addCard } from "../services/cardsServices";

function* addCardAsync(action: PayloadAction<{ uid: string; card: ICard }>) {
  try {
    const key: string | null = yield call(
      addCard,
      action.payload.uid,
      action.payload.card,
    );
    if (typeof key === "string") {
      yield put(
        requestAddCardSuccessful({ key: key, card: action.payload.card })
      );
    } else {
      yield put(requestCardsFailed());
    }
  } catch {
    yield put(requestCardsFailed());
  }
}

export function* addCardWatcher() {
  yield takeEvery(requestAddCard, addCardAsync);
}
