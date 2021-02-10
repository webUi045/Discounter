import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, call, put, all } from "redux-saga/effects";
import {
    requestProfileDataFailed,
    editProfileDataSuccessful,
    editEmail,
} from "../reducers/discounterReducer";
import { IUserEmail } from "../reducers/payloadActionTypes";
import { changeEmail } from "./services";

function* editEmailSaga(action: PayloadAction<IUserEmail>) {
    try {
        yield call(changeEmail,
            action.payload.email,
        );
        yield put(editProfileDataSuccessful());

    } catch {
        yield put(requestProfileDataFailed());
    }
}

export const fetchEditEmailSaga = () => {
    return takeLatest(editEmail, editEmailSaga);
};

export function* editEmailSagas() {
    yield all([fetchEditEmailSaga()]);
}