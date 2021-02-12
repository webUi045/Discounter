import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, call, put, all } from "redux-saga/effects";
import {
    requestProfileDataFailed,
    editProfileDataSuccessful,
    editEmail,
    editEmailFailed,
} from "../reducers/discounterReducer";
import { IUserEmail } from "../reducers/payloadActionTypes";
import { changeEmail } from "./services";

function* editEmailSaga(action: PayloadAction<IUserEmail>) {
    try {
        yield call(changeEmail,
            action.payload.email,
        );
        yield put(editProfileDataSuccessful());
    } catch (error) {
        let emailError = "";
        switch (error.code) {
            case "auth/invalid-email":
            case "auth/email-already-in-use":
                emailError = error.message;
                break;
        }
        console.log(error);
        yield put(editEmailFailed({ emailError }));


        // yield put(requestProfileDataFailed());
    }
}

export const fetchEditEmailSaga = () => {
    return takeLatest(editEmail, editEmailSaga);
};

export function* editEmailSagas() {
    yield all([fetchEditEmailSaga()]);
}