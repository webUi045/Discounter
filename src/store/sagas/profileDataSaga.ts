import { takeLatest, call, put, all, select } from "redux-saga/effects";
import {ISetUserPhoto} from "../reducers/payloadActionTypes";
import {
  IInitialState,
  requestProfileData,
  requestProfileDataSuccessful,
  requestProfileDataFailed,
} from "../reducers/discounterReducer";
import { fetchUserData } from "./services";

function* profileDataSaga() {
  try {
    const state: { store: IInitialState } = yield select();
    const data: ISetUserPhoto = yield call(fetchUserData, state.store.user.uid);
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
