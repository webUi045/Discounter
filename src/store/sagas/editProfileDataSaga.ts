import { RootState } from './../store';
import {PayloadAction} from "@reduxjs/toolkit";
import {takeLatest, call, put, all, select} from "redux-saga/effects";
import {
  editProfileData,
  editProfileDataSuccessful,
  editFirstNameFailed,
  editLastNameFailed
} from "../profile/reducer/reducer";
import {IUserName} from "../profile/payloadActionTypes";
import {nameValidator, updateUserData} from "./services";

function* editProfileDataSaga(action: PayloadAction<IUserName>) {

  const state: RootState = yield select();

  if (!nameValidator(action.payload.firstName)) {
    yield put(editFirstNameFailed('First name incorrect! (First letter is capet, min 2 letters)'));
    return;
  }

  if (!nameValidator(action.payload.lastName)) {
    yield put(editLastNameFailed('Last name incorrect! (First letter is capet, min 2 letters)'));
    return;
  }

  yield call(
    updateUserData,
    state.profile.user.uid,
    action.payload.firstName,
    action.payload.lastName,
  );
  yield put(editProfileDataSuccessful(action.payload));
}

export const fetchEditProfileDataSaga = () => {
  return takeLatest(editProfileData, editProfileDataSaga);
};

export function* editProfileDataSagas() {
  yield all([fetchEditProfileDataSaga()]);
}
