import { takeLatest, call, put, all } from "redux-saga/effects";
import { IUniqueUserData, IUserData } from "../reducers/payloadActionTypes";
import {
  initProfilePage,
  requestProfileDataSuccessful,
  requestUserAuthorizationSuccessful,
  requestUserAuthorizationFailed,
} from "../reducers/discounterReducer";
import { isUserAuthorized, fetchUserData } from "./services";

function* initProfileSaga() {
  const user: IUniqueUserData = yield call(isUserAuthorized);

  if (user) {
    yield put(requestUserAuthorizationSuccessful(user));
    const data: IUserData = yield call(fetchUserData, user.uid);
    yield put(requestProfileDataSuccessful(data));
  } else {
    yield put(requestUserAuthorizationFailed());
  }
}

export const fetchInitProfileSaga = () => {
  return takeLatest(initProfilePage, initProfileSaga);
};

export function* initProfileSagas() {
  yield all([fetchInitProfileSaga()]);
}
