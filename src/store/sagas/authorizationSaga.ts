import {takeLatest, call, put, all} from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import {signIn} from "./services";
import {
  requestAuthorization,
  requestAuthorizationSuccessful,
  requestAuthorizationFailed,
} from "../reducers/discounterReducer";
import {IRequestAuthorization} from "../reducers/payloadActionTypes";

function* authorizationSaga(action: PayloadAction<IRequestAuthorization>) {
  try {
    const userData = yield call(
      signIn,
      action.payload.email,
      action.payload.password
    );

    yield put(requestAuthorizationSuccessful(userData));

  } catch (error) {

    yield put(requestAuthorizationFailed(error));
  }
}

export const fetchAuthorization = () => {
  return takeLatest(requestAuthorization, authorizationSaga);
};

export function* authorizationSagas() {
  yield all([fetchAuthorization()]);
}
