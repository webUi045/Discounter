import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, call, put, all, select } from "redux-saga/effects";
import {
  IInitialState,
  editProfileData,
  editProfileDataSuccessful,
  editFirstNameFailed,
  editLastNameFailed,
} from "../reducers/discounterReducer";
import { IUserName } from "../reducers/payloadActionTypes";
import { nameValidator, updateUserData } from "../services/profileServices";

function* editProfileDataSaga(action: PayloadAction<IUserName>) {
  const state: { store: IInitialState } = yield select();

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
    state.store.user.uid,
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
