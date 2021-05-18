import { IUniqueUserData } from './../actionTypes/profilePayloadActionTypes';
import { isUserAuthorized } from './../services/profileServices';
import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, call, put } from "redux-saga/effects";

import { ICardsObj } from "../actionTypes/cardsPayloadActionTypes";
import { requestCards, requestCardsSuccessful, requestCardsFailed } from "../reducers/cardsReducer";
import { fetchCards } from "../services/cardsServices";
import { requestUserAuthorizationSuccessful } from '../reducers/profileReducer';

function* requestCardsSaga(action: PayloadAction<string>) {
    const user: IUniqueUserData = yield call(isUserAuthorized);
    const { payload } = action

    if (user) {
        yield put(requestUserAuthorizationSuccessful(user));
        const cards: ICardsObj = yield call(fetchCards, payload);
        yield put(requestCardsSuccessful({ cards }));
    } else {
        yield put(requestCardsFailed());
    }
}

export function* watchFetchCards(): Generator {
    yield takeLatest(requestCards, requestCardsSaga);
};