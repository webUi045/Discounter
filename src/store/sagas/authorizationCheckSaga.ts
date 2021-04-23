import { takeLatest, call, put, all } from "redux-saga/effects";
import { IUniqueUserData, IUserData } from "../profile/payloadActionTypes";
import {
  requestAuthorizationCheck,
  requestUserAuthorizationSuccessful,
  requestUserAuthorizationFailed,
  requestProfileDataSuccessful,
} from "../profile/reducer/reducer";
import { fetchUserData, isUserAuthorized } from "./services";

function* authorizationCheckSaga() {
  const data: IUniqueUserData = yield call(isUserAuthorized);
  if (data) {
    yield put(requestUserAuthorizationSuccessful(data));
    const userprofileData: IUserData = yield call(fetchUserData, data.uid);
    yield put(requestProfileDataSuccessful(userprofileData));

  } else {
    yield put(requestUserAuthorizationFailed());
  }
}

export const fetchAuthorizationCheck = () => {
  return takeLatest(requestAuthorizationCheck, authorizationCheckSaga);
};

export function* authorizationCheckSagas() {
  yield all([fetchAuthorizationCheck()]);
}
