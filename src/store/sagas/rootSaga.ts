import { all } from "redux-saga/effects";
import { authorizationCheckSagas } from "./authorizationCheckSaga";
import { authorizationSagas } from "./authorizationSaga";
import { editProfileDataSagas } from "./editProfileDataSaga";
import { initProfileSagas } from "./initProfileSaga";
import { profileDataSagas } from "./profileDataSaga";
import { registrationSagas } from "./registrationSaga";
import { shopsSagas } from "./shopsSaga";

export default function* rootSaga() {
  yield all([
    shopsSagas(),
    authorizationSagas(),
    registrationSagas(),
    profileDataSagas(),
    authorizationCheckSagas(),
    initProfileSagas(),
    editProfileDataSagas(),
  ]);
}
