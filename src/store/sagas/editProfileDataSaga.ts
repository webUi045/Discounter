import {PayloadAction} from "@reduxjs/toolkit";
import {takeLatest, call, put, all, select} from "redux-saga/effects";
import {
  IInitialState,
  requestProfileDataFailed,
  editProfileData,
  editProfileDataSuccessful,
} from "../reducers/discounterReducer";
import {IRequestRegistration} from "../reducers/payloadActionTypes";
import {
  changeEmail,
  changePassword,
  editUserData,
  fetchUserData,
} from "./services";

function* editProfileDataSaga(action: PayloadAction<IRequestRegistration>) {
  try {
    const state: { store: IInitialState } = yield select();

    yield call(
      editUserData,
      state.store.user.uid,
      action.payload.firstName,
      action.payload.lastName,
    );
    const userData = yield call(fetchUserData, state.store.user.uid)
    yield put(editProfileDataSuccessful());

    yield call(changeEmail,
      action.payload.email,
    );

    if (action.payload.password) {
     const data =  yield call(changePassword,
        action.payload.password,
      );

    }
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