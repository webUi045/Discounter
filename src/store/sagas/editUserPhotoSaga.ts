import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { IFileUserPhoto } from "../reducers/payloadActionTypes";
import { IInitialState, uploadUserPhoto, setUserPhoto } from "../reducers/discounterReducer";
import { addUserPhoto, writeUserPhoto } from "./services";

function* editUserPhotoSaga(action: PayloadAction<IFileUserPhoto>) {
  try {
    const state: { store: IInitialState } = yield select();
    const data: string = yield call(addUserPhoto,
      action.payload.photo,
      state.store.user.uid,
    );
    yield call(
      writeUserPhoto,
      state.store.user.uid,
      data,
    );

    yield put(setUserPhoto({
      userPhoto: data,
    }));
  } catch (e) {
    console.log('error', e)
  }
}

export const fetchEditUserPhotoSaga = () => {
  return takeLatest(uploadUserPhoto, editUserPhotoSaga);
};

export function* editUserPhotoSagas() {
  yield all([fetchEditUserPhotoSaga()]);
}