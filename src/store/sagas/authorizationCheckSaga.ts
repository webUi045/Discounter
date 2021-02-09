import { takeLatest, call, put, all } from "redux-saga/effects";
import { IUniqueUserData } from "../reducers/payloadActionTypes";
import {
  requestAuthorizationCheck,
  requestUserAuthorization,
  requestUserAuthorizationFailed,
} from "../reducers/discounterReducer";
import { isUserAuthorized } from "./services";

function* authorizationCheckSaga() {
  const data: IUniqueUserData = yield call(isUserAuthorized);
  if (data) {
    yield put(requestUserAuthorization(data));
  } else {
    yield put(requestUserAuthorizationFailed());
  }
}

export const fetchAuthorizationCheck = () => {
  return takeLatest(requestAuthorizationCheck, authorizationCheckSaga);
};

export function* authorizationCheckSagas() {
  yield all([fetchAuthorizationCheck()]);
}