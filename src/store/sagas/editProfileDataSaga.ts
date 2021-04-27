import { RootState } from './../reducers/rootReducer';
import {PayloadAction} from "@reduxjs/toolkit";
import {takeLatest, call, put, all, select} from "redux-saga/effects";
import {
  editProfileData,
  editProfileDataSuccessful,
  editFirstNameFailed,
  editLastNameFailed
} from "../reducers/profileReducer";
import {IUserName} from "../actionTypes/profilePayloadActionTypes";
import {nameValidator, updateUserData} from "../services/profileServices";

function* editProfileDataSaga(action: PayloadAction<IUserName>) {

  const state: RootState = yield select();

  if (!nameValidator(action.payload.firstName)) {
    yield put(
      editFirstNameFailed(
        "First name incorrect! (First letter is capet, min 2 letters)"
      )
    );
    return;
  }

  if (!nameValidator(action.payload.lastName)) {
    yield put(
      editLastNameFailed(
        "Last name incorrect! (First letter is capet, min 2 letters)"
      )
    );
    return;
  }

  yield call(
    updateUserData,
    state.profileReducer.user.uid,
    action.payload.firstName,
    action.payload.lastName
  );
  yield put(editProfileDataSuccessful(action.payload));
}

export const fetchEditProfileDataSaga = () => {
  return takeLatest(editProfileData, editProfileDataSaga);
};

export function* editProfileDataSagas() {
  yield all([fetchEditProfileDataSaga()]);
}
