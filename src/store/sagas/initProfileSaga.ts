import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  initProfilePage,
  profileDataRecieved,
  userAuthorized,
  userNotAuthorized,
} from "../reducers/shopsReducer";
import { getUser, readUserData } from "./services";

function* initProfileSaga() {
  const user = yield call(getUser);
  if (user) {
    yield put(userAuthorized(user));
    const data = yield call(readUserData, user.uid);
    yield put(profileDataRecieved(data));
  } else {
    yield put(userNotAuthorized());
  }
}

export const fetchInitProfileSaga = () => {
  return takeLatest(initProfilePage, initProfileSaga);
};

export function* initProfileSagas() {
  yield all([fetchInitProfileSaga()]);
}
