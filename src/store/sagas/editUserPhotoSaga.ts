import {PayloadAction} from "@reduxjs/toolkit";
import {takeLatest, call, put, all, select} from "redux-saga/effects";
import {IFileUserPhoto} from "../reducers/payloadActionTypes";
import {IInitialState, uploadUserPhoto, setUserPhoto} from "../reducers/discounterReducer";
import {editUserData, editUserPhoto} from "./services";

function* editUserPhotoSaga(action: PayloadAction<IFileUserPhoto>) {
  try {
    const state: { store: IInitialState } = yield select();
    const data: string = yield call(editUserPhoto,
      action.payload.photo,
      state.store.user.uid,
    );

    editUserData(
      state.store.user.uid,
      action.payload.firstName,
      action.payload.lastName,
      data,
    )
    yield put(setUserPhoto({
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
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