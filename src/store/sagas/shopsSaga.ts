import { takeLatest, call, put, all } from "redux-saga/effects";
import { IShop } from "../../types";
import {
  shopsRequested,
  shopsRecieved,
  shopsFailed,
} from "../reducers/discounterReducer";
import {fetchShops} from "./services";

function* requestShopsSaga() {
  try {
    const shops : IShop[] = yield call(fetchShops);
    yield put(shopsRecieved( {shops} ));
  } catch {
    yield put(shopsFailed());
  }
}
export const fetchShopsSub = () => {
  return takeLatest(shopsRequested, requestShopsSaga);
};

export function* shopsSagas() {
  yield all([fetchShopsSub()]);
}
