import { takeLatest, call, put, all } from "redux-saga/effects";
import { IShop } from "../actionTypes/shopsPayloadActionTypes";
import { requestShops, requestShopsSuccessful, requestShopsFailed } from "../reducers/shopsReducer";
import { fetchShops } from "./services";

function* requestShopsSaga() {
  try {
    const shops: IShop[] = yield call(fetchShops);
    yield put(requestShopsSuccessful({ shops }));

  } catch {
    yield put(requestShopsFailed());
  }
}
export const fetchShopsSub = () => {
  return takeLatest(requestShops, requestShopsSaga);
};

export function* shopsSagas() {
  yield all([fetchShopsSub()]);
}
