import { all } from "redux-saga/effects";
import { authorizationCheckSagas } from "./authorizationCheckSaga";
import { authorizationSagas } from "./authorizationSaga";
import { editProfileDataSagas } from "./editProfileDataSaga";
import { initProfileSagas } from "./initProfileSaga";
import { profileDataSagas } from "./profileDataSaga";
import { registrationSagas } from "./registrationSaga";
import { signOutSagas } from "./signoutSaga";
import { shopsSagas } from "./shopsSaga";
import { editUserPhotoSagas } from "./editUserPhotoSaga";
import { editEmailSagas } from "./editEmailSaga";
import { editPasswordSagas } from "./editPasswordSaga";
import { watchFetchCards } from "./cardsSaga";

export default function* rootSaga() {
  yield all([
    watchFetchCards(),
    shopsSagas(),
    authorizationSagas(),
    registrationSagas(),
    signOutSagas(),
    profileDataSagas(),
    authorizationCheckSagas(),
    initProfileSagas(),
    editProfileDataSagas(),
    editUserPhotoSagas(),
    editEmailSagas(),
    editPasswordSagas(),
  ]);
}