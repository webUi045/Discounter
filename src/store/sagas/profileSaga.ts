import { takeLatest, call, put, all, select } from "redux-saga/effects";
import {
  profileDataFailed,
  profileDataRecieved,
  profileDataRequested,
} from "../reducers/shopsReducer";
import { readUserData } from "./services";

function* profileSaga() {
  try {
    const state = yield select();
    const data = yield call(readUserData, state.store.user.uid);
    yield put(profileDataRecieved(data));
  } catch (error) {
    yield put(profileDataFailed(error.code));
  }
}

export const fetchProfileSaga = () => {
  return takeLatest(profileDataRequested, profileSaga);
};

export function* profileSagas() {
  yield all([fetchProfileSaga()]);
}
