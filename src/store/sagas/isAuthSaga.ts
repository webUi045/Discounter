import { takeLatest, call, put, all } from "redux-saga/effects";
import { IUniqueUserData } from "../reducers/payloadActionTypes";
import {
  requestAuthorizationCheck,
  requestUserAuthorization,
  requestUserAuthorizationFailed,
} from "../reducers/discounterReducer";
import { getUser } from "./services";

function* isAuthSaga() {
  const data : IUniqueUserData = yield call(getUser);
  if (data) {
    yield put(requestUserAuthorization(data));
  } else {
    yield put(requestUserAuthorizationFailed());
  }
}

export const fetchIsAuth = () => {
  return takeLatest(requestAuthorizationCheck, isAuthSaga);
};

export function* isAuthSagas() {
  yield all([fetchIsAuth()]);
}
