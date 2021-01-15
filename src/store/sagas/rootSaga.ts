import { all } from "redux-saga/effects";
import { authSagas } from "./authSaga";
import { initProfileSagas } from "./initProfileSaga";
import { isAuthSagas } from "./isAuthSaga";
import { profileSagas } from "./profileSaga";
import { registerSagas } from "./registerSaga";
import { shopsSagas } from "./shopsSaga";

export default function* rootSaga() {
  yield all([
    shopsSagas(),
    authSagas(),
    registerSagas(),
    profileSagas(),
    isAuthSagas(),
    initProfileSagas()
  ]);
}
