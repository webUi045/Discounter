import { RootState } from './../reducers/rootReducer';
import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { IUserData } from "../actionTypes/profilePayloadActionTypes";
import {
  IInitialState,
  requestProfileData,
  requestProfileDataSuccessful,
  requestProfileDataFailed,
} from "../reducers/profileReducer";
import { fetchUserData } from "../services/profileServices";

function* profileDataSaga() {
  try {
    const state: RootState = yield select();
    const data: IUserData = yield call(fetchUserData, state.profileReducer.user.uid);
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