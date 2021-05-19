import { takeLatest, call, put, select } from "redux-saga/effects";
import { ICardsObj } from "../actionTypes/cardsPayloadActionTypes";
import {
  requestCards,
  requestCardsSuccessful,
  requestCardsFailed,
} from "../reducers/cardsReducer";
import { fetchCards } from "../services/cardsServices";
import { initProfileSaga } from "./initProfileSaga";
import { RootState } from "../reducers/rootReducer";

function* requestCardsSaga() {
  try {
    yield call(initProfileSaga);
    const state: RootState = yield select();
    const cards: ICardsObj = yield call(
      fetchCards,
      state.profileReducer.user.uid
    );
    yield put(requestCardsSuccessful({ cards }));
  } catch (err) {
    yield put(requestCardsFailed());
  }
}

export function* watchFetchCards(): Generator {
  yield takeLatest(requestCards, requestCardsSaga);
}