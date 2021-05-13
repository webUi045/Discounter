import { takeLatest, call, put, all, takeEvery } from "redux-saga/effects";
import { ICard } from "../actionTypes/cardsPayloadActionTypes";
import { requestCards, requestCardsSuccessful, requestCardsFailed } from "../reducers/cardReducer";
import { fetchCards } from "../services/cardsServices";

function* requestShopsSaga() {
  try {
    const cards: ICard[] = yield call(fetchCards);
    console.log(cards)
    yield put(requestCardsSuccessful(cards));
  } catch {
    yield put(requestCardsFailed());
  }
}
export function* watchFetchCards (): Generator {
    yield takeEvery(requestCards, requestShopsSaga); 
};