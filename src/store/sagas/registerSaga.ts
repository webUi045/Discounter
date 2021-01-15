import { takeLatest, call, put, all } from "redux-saga/effects";
import { signUp, writeUserData } from "./services";
import {
  registerRecieved,
  registerRequested,
  registerFailed,
} from "../reducers/shopsReducer";

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
    yield put(registerFailed(error.code));
  }
}

export const fetchRegister = () => {
  return takeLatest(registerRequested, registerSaga);
};

export function* registerSagas() {
  yield all([fetchRegister()]);
}
