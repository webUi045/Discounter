import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { IUserData } from "../reducers/actionTypes";
import {
  IInitialState,
  requestProfileData,
  requestProfileDataSuccessful,
  requestProfileDataFailed,
} from "../reducers/discounterReducer";
import { readUserData } from "./services";

function* profileDataSaga() {
  try {
    const state: { store: IInitialState } = yield select();
    const data: IUserData = yield call(readUserData, state.store.user.uid);
    yield put(requestProfileDataSuccessful(data));
  } catch {
    yield put(requestProfileDataFailed());
  }
}

export const fetchProfileDataSaga = () => {
  return takeLatest(requestProfileData, profileDataSaga);
};

export function* profileDataSagas() {
  yield all([fetchProfileDataSaga()]);
}
