import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, call, put, all } from "redux-saga/effects";
import {
    editPasswordSuccessful,
    editPassword,
    editPasswordFailed,
} from "../reducers/profileReducer";
import { IUserPassword } from "../actionTypes/profilePayloadActionTypes";
import { changePassword } from "./services";

function* editPasswordSaga(action: PayloadAction<IUserPassword>) {
    try {
        yield call(changePassword,
            action.payload.password,
        );
        yield put(editPasswordSuccessful());

    } catch (error) {
        let passwordError = "";
        switch (error.code) {
            case "auth/wrong-password":
            case "auth/weak-password":
                passwordError = error.message;
                break;
        }
        yield put(editPasswordFailed({ passwordError }));
    }
}

export const fetchEditPasswordSaga = () => {
    return takeLatest(editPassword, editPasswordSaga);
};

export function* editPasswordSagas() {
    yield all([fetchEditPasswordSaga()]);
}