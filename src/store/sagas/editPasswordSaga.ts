import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, call, put, all } from "redux-saga/effects";
import {
    requestProfileDataFailed,
    editProfileDataSuccessful,
    editPassword,
} from "../reducers/discounterReducer";
import { IUserPassword } from "../reducers/payloadActionTypes";
import { changePassword } from "./services";

function* editPasswordSaga(action: PayloadAction<IUserPassword>) {
    try {
        yield call(changePassword,
            action.payload.password,
        );
        yield put(editProfileDataSuccessful());

    } catch {
        yield put(requestProfileDataFailed());
    }
}

export const fetchEditPasswordSaga = () => {
    return takeLatest(editPassword, editPasswordSaga);
};

export function* editPasswordSagas() {
    yield all([fetchEditPasswordSaga()]);
}