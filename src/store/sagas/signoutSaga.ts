import { takeLatest, call, put, all } from "redux-saga/effects";
import { signOut } from "./services";
import {
  requestSignOut,
  requestSignOutSuccessful,
  requestSignOutFailed
} from "../profile/reducer/reducer";

function* signOutSaga() {
  try {
    yield call(signOut);
    yield put(requestSignOutSuccessful());
  } catch (error) {
    const signOutError = "An error occurred during sing out";
    yield put(requestSignOutFailed({ signOutError }));
  }
}

export const fetchSignOut = () => {
  return takeLatest(requestSignOut, signOutSaga);
};

export function* signOutSagas() {
  yield all([fetchSignOut()]);
}