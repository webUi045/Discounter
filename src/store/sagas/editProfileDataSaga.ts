import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, call, put, all, select } from "redux-saga/effects";
import {
  IInitialState,
  requestProfileDataFailed,
  editProfileData,
  editProfileDataSuccessful,
} from "../reducers/discounterReducer";
import { IUserName } from "../reducers/payloadActionTypes";
import { updateUserData } from "./services";

function* editProfileDataSaga(action: PayloadAction<IUserName>) {
  try {
    const state: { store: IInitialState } = yield select();

    yield call(
      updateUserData,
      state.store.user.uid,
      action.payload.firstName,
      action.payload.lastName,
    );
    yield put(editProfileDataSuccessful());

    // if (action.payload.password) {
    //   yield call(changePassword,
    //     action.payload.password,
    //   );
    // }
  } catch {
    yield put(requestProfileDataFailed());
  }
}

export const fetchEditProfileDataSaga = () => {
  return takeLatest(editProfileData, editProfileDataSaga);
};

export function* editProfileDataSagas() {
  yield all([fetchEditProfileDataSaga()]);
}