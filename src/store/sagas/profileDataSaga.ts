import { RootState } from './../store';
import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { IUserData } from "../profile/payloadActionTypes";
import {
  IInitialState,
  requestProfileData,
  requestProfileDataSuccessful,
  requestProfileDataFailed,
} from "../profile/reducer/reducer";
import { fetchUserData } from "./services";

function* profileDataSaga() {
  try {
    const state: RootState = yield select();
    const data: IUserData = yield call(fetchUserData, state.profile.user.uid);
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
