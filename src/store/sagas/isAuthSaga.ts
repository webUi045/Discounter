import { takeLatest, call, put, all } from "redux-saga/effects";
import { IUniqueUserData } from "../reducers/actionTypes";
import {
  checkAuthorizedRequested,
  userAuthorized,
  userNotAuthorized,
} from "../reducers/discounterReducer";
import { getUser } from "./services";

function* isAuthSaga() {
  const data : IUniqueUserData = yield call(getUser);
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
