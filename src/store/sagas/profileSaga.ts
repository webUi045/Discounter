import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { IUserData } from "../reducers/actionTypes";
import {
  IInitialState,
  profileDataFailed,
  profileDataRecieved,
  profileDataRequested,
} from "../reducers/discounterReducer";
import { readUserData } from "./services";

function* profileSaga() {
  try {
    const state: { store: IInitialState } = yield select();
    const data: IUserData = yield call(readUserData, state.store.user.uid);
    yield put(profileDataRecieved(data));
  } catch {
    yield put(profileDataFailed());
  }
}

export const fetchProfileSaga = () => {
  return takeLatest(profileDataRequested, profileSaga);
};

export function* profileSagas() {
  yield all([fetchProfileSaga()]);
}
