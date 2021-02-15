import {PayloadAction} from "@reduxjs/toolkit";
import {takeLatest, call, put, all, select} from "redux-saga/effects";
import {
  IInitialState,
  editProfileData,
  editProfileDataSuccessful,
  editFirstNameFailed,
  editLastNameFailed
} from "../reducers/discounterReducer";
import {IUserName} from "../reducers/payloadActionTypes";
import {updateUserData} from "./services";

function* editProfileDataSaga(action: PayloadAction<IUserName>) {

  const state: { store: IInitialState } = yield select();

  if (!/^[A-Z]/.test(action.payload.firstName[0])) {
    yield put(editFirstNameFailed('First name must start from capet letter!'));
    return;
  } else if (action.payload.firstName.length < 2) {

    yield put(editFirstNameFailed('First name must be 2 letters or more!'));
    return;
  } else if (!/^[A-Z]/.test(action.payload.lastName[0])) {

    yield put(editLastNameFailed('Last name must start from capet letter!'));
    return;
  } else if (action.payload.lastName.length < 2) {

    yield put(editLastNameFailed('Last name must be 2 letters or more!'));
    return;
  }

  yield call(
    updateUserData,
    state.store.user.uid,
    action.payload.firstName,
    action.payload.lastName,
  );
  yield put(editProfileDataSuccessful());
}

export const fetchEditProfileDataSaga = () => {
  return takeLatest(editProfileData, editProfileDataSaga);
};

export function* editProfileDataSagas() {
  yield all([fetchEditProfileDataSaga()]);
}
