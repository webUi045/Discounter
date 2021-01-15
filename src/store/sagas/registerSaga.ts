import { takeLatest, call, put, all } from "redux-saga/effects";
import { signUp, writeUserData } from "./services";
import {
  registerRecieved,
  registerRequested,
  registerFailed,
} from "../reducers/discounterReducer";

function* registerSaga(action: any) {
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
    yield put(registerRecieved(data.user));
  } catch (error) {
    console.log(error)
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
    yield put(registerFailed({ emailError, passwordError }));
  }
}

export const fetchRegister = () => {
  return takeLatest(registerRequested, registerSaga);
};

export function* registerSagas() {
  yield all([fetchRegister()]);
}
