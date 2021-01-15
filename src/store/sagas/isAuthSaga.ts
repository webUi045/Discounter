import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  checkAuthorizedRequested,
  userAuthorized,
  userNotAuthorized,
} from "../reducers/shopsReducer";
import { getUser } from "./services";

function* isAuthSaga() {
  const data = yield call(getUser);
  if (data) {
    yield put(userAuthorized(data));
  } else {
    yield put(userNotAuthorized());
  }
}

export const fetchIsAuth = () => {
  return takeLatest(checkAuthorizedRequested, isAuthSaga);
};

export function* isAuthSagas() {
  yield all([fetchIsAuth()]);
}
