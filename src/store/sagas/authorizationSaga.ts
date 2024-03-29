import { takeLatest, call, put, all } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { signIn } from "../services/profileServices";
import {
  requestAuthorization,
  requestAuthorizationSuccessful,
  requestAuthorizationFailed,
} from "../reducers/profileReducer";
import {IRequestAuthorization} from "../actionTypes/profilePayloadActionTypes";

function* authorizationSaga(action: PayloadAction<IRequestAuthorization>): Generator {

  try {
    const userData: any = yield call(
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
