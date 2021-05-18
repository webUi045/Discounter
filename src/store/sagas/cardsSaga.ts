import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, call, put, all } from "redux-saga/effects";

import { ICard } from "../actionTypes/cardsPayloadActionTypes";
import { requestCards, requestCardsSuccessful, requestCardsFailed } from "../reducers/cardsReducer";
import { fetchCards } from "../services/cardsServices";

function* requestCardsSaga(action: PayloadAction<string>) {
    const { payload } = action

    try {
        const cards: ICard[] = yield call(fetchCards, payload);
        yield put(requestCardsSuccessful({ cards }));
    } catch {
        yield put(requestCardsFailed());
    }
}
export function* watchFetchCards(): Generator {
    yield takeLatest(requestCards, requestCardsSaga);
};