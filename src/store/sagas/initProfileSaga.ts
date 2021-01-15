import { takeLatest, call, put, all } from "redux-saga/effects";
import { IUniqueUserData, IUserData } from "../reducers/actionTypes";
import {
  initProfilePage,
  profileDataRecieved,
  userAuthorized,
  userNotAuthorized,
} from "../reducers/discounterReducer";
import { getUser, readUserData } from "./services";

function* initProfileSaga() {
  const user : IUniqueUserData = yield call(getUser);
  if (user) {
    yield put(userAuthorized(user));
    const data : IUserData = yield call(readUserData, user.uid);
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
