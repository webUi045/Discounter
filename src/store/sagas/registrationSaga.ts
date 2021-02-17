import { takeLatest, call, put, all } from "redux-saga/effects";
import { signUp, writeUserData } from "./services";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  requestRegistration,
  requestRegistrationSuccessful,
  requestRegistrationFailed,
} from "../reducers/discounterReducer";
import { IRequestRegistration } from "../reducers/payloadActionTypes";

function* registrationSaga(action: PayloadAction<IRequestRegistration>) {
  try {
    const data = yield call(
      signUp,
      action.payload.email,
      action.payload.password
    );
    yield call(
      writeUserData,
      data.user.uid,
      action.payload.firstName,
      action.payload.lastName
    );
    yield put(requestRegistrationSuccessful(data.user));
  } catch (error) {
    let emailError = "",
      passwordError = "";

    switch (error.code) {
      case "auth/email-already-in-use":
      case "auth/invalid-email":
        emailError = error.message;
        break;
      case "auth/wrong-password":
      case "auth/weak-password":
        passwordError = error.message;
        break;
    }
    yield put(requestRegistrationFailed({ emailError, passwordError }));
  }
}

export const fetchRegistration = () => {
  return takeLatest(requestRegistration, registrationSaga);
};

export function* registrationSagas() {
  yield all([fetchRegistration()]);
}
