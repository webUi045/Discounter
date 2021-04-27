import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  editEmail,
  editEmailFailed,
  editEmailSuccessful
} from "../reducers/profileReducer";
import { IUserEmail } from "../actionTypes/profilePayloadActionTypes";
import { changeEmail } from "./services";

function* editEmailSaga(action: PayloadAction<IUserEmail>) {
  try {
    const { newEmail } = yield call(changeEmail,
      action.payload.email,
    );

    yield put(editEmailSuccessful({ email: newEmail }));
  } catch (error) {
    let emailError = "";
    switch (error.code) {
      case "auth/invalid-email":
      case "auth/email-already-in-use":
        // case "auth/requires-recent-login":
        emailError = error.message;
        break;
    }
    yield put(editEmailFailed({ emailError }));
  }
}

export const fetchEditEmailSaga = () => {
  return takeLatest(editEmail, editEmailSaga);
};

export function* editEmailSagas() {
  yield all([fetchEditEmailSaga()]);
}