import { takeLatest, call, put, all } from "redux-saga/effects";
import {  PayloadAction } from "@reduxjs/toolkit";
import { signIn } from "./services";
import {
  requestAuthorization,
  requestAuthorizationSucceessful,
  requestAuthorizationFailed,
} from "../reducers/discounterReducer";
import { IRequestAuthorization } from "../reducers/payloadActionTypes";

function* authSaga(action: PayloadAction<IRequestAuthorization>) {
  try {
    const data = yield call(
      signIn,
      action.payload.email,
      action.payload.password
    );
    yield put(requestAuthorizationSucceessful(data.user));
  } catch (error) {
    let emailError = "",
      passwordError = "";
    switch (error.code) {
      case "auth/invalid-email":
      case "auth/user-disabled":
      case "auth/user-not-found":
        emailError = error.message;
        break;
      case "auth/wrong-password":
        passwordError = error.message;
        break;
    }
    yield put(requestAuthorizationFailed({ emailError, passwordError }));
  }
}

export const fetchAuth = () => {
  return takeLatest(requestAuthorization, authSaga);
};

export function* authSagas() {
  yield all([fetchAuth()]);
}
