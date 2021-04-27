import { RootState } from './../reducers/rootReducer';
import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { IFileUserPhoto } from "../actionTypes/profilePayloadActionTypes";
import { uploadUserPhoto, setUserPhoto, uploadUserPhotoFailed } from "../reducers/profileReducer";
import { addUserPhoto, writeUserPhoto } from "./services";

function* editUserPhotoSaga(action: PayloadAction<IFileUserPhoto>) {
  const userPhotoFormat = action.payload.photo;
  
  if (userPhotoFormat.type !== "image/jpeg" && userPhotoFormat.type !== "image/png") {
    yield put(uploadUserPhotoFailed({ photoError: "Incorrect file format!" }));
    
    return
  }

  try {
    const state: RootState = yield select();
    const data: string = yield call(addUserPhoto,
      action.payload.photo,
      state.profileReducer.user.uid,
    );
    yield call(
      writeUserPhoto,
      state.profileReducer.user.uid,
      data,
    );
    yield put(setUserPhoto({
      userPhoto: data,
    }));
  } catch (error) {
    yield put(uploadUserPhotoFailed(error));
  }
}

export const fetchEditUserPhotoSaga = () => {
  return takeLatest(uploadUserPhoto, editUserPhotoSaga);
};

export function* editUserPhotoSagas() {
  yield all([fetchEditUserPhotoSaga()]);
}