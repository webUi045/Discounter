import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  nameValidator,
  signUp,
  writeUserData,
} from "../services/profileServices";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  requestRegistration,
  requestRegistrationSuccessful,
  requestRegistrationFailed,
  editFirstNameFailed,
  editLastNameFailed,
} from "../reducers/discounterReducer";
import {
  IRequestRegistration,
  IUniqueUserData,
} from "../reducers/payloadActionTypes";
import firebase from "../../../node_modules/firebase";

function* registrationSaga(action: PayloadAction<IRequestRegistration>) {
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

  try {
    const data: firebase.auth.UserCredential = yield call(
      signUp,
      action.payload.email,
      action.payload.password
    );

    const user = data.user;
    if (user) {
      yield call(
        writeUserData,
        user.uid,
        action.payload.firstName,
        action.payload.lastName
      );
      yield put(requestRegistrationSuccessful(user as IUniqueUserData));
    }
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
