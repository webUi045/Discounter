import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { IUserData } from "../reducers/payloadActionTypes";
import {
  IInitialState,
  requestProfileDataFailed,
  requestProfileDataSuccessful,
  requestProfileData,
} from "../reducers/discounterReducer";
import { readUserData } from "./services";

function* profileSaga() {
  try {
    const state: { store: IInitialState } = yield select();
    const data: IUserData = yield call(readUserData, state.store.user.uid);
    yield put(requestProfileDataSuccessful(data));
  } catch {
    yield put(requestProfileDataFailed());
  }
}

export const fetchProfileSaga = () => {
  return takeLatest(requestProfileData, profileSaga);
};

export function* profileSagas() {
  yield all([fetchProfileSaga()]);
}
