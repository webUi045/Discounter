import { takeLatest, call, put, all } from "redux-saga/effects";
import { signIn } from "./services";
import {
  authorizeFailed,
  authorizeRecieved,
  authorizeRequested,
} from "../reducers/discounterReducer";

function* authSaga(action: any) {
  try {
    const data = yield call(
      signIn,
      action.payload.email,
      action.payload.password
    );
    yield put(authorizeRecieved(data.user));
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
    yield put(authorizeFailed({ emailError, passwordError }));
  }
}

export const fetchAuth = () => {
  return takeLatest(authorizeRequested, authSaga);
};

export function* authSagas() {
  yield all([fetchAuth()]);
}
