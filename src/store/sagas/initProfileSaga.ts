import { takeLatest, call, put, all } from "redux-saga/effects";
import { IUniqueUserData, IUserData } from "../actionTypes/profilePayloadActionTypes";
import {
  initProfilePage,
  requestProfileDataSuccessful,
  requestUserAuthorizationSuccessful,
  requestUserAuthorizationFailed,
} from "../reducers/profileReducer";
import { isUserAuthorized, fetchUserData } from "../services/profileServices";

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
