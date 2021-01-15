import { takeLatest, call, put, all } from "redux-saga/effects";
import { signIn } from "./services";
import {
  authorizeFailed,
  authorizeRecieved,
  authorizeRequested,
} from "../reducers/shopsReducer";

function* authSaga(action: any) {
  try {
    const data = yield call(
      signIn,
      action.payload.email,
      action.payload.password
    );
    yield put(authorizeRecieved(data.user));
  } catch (error) {
    yield put(authorizeFailed(error.code));
  }
}

export const fetchAuth = () => {
  return takeLatest(authorizeRequested, authSaga);
};

export function* authSagas() {
  yield all([fetchAuth()]);
}
