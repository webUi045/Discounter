import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { IFileUserPhoto } from "../reducers/payloadActionTypes";
import { IInitialState, uploadUserPhoto, setUserPhoto, uploadUserPhotoFailed } from "../reducers/discounterReducer";
import { addUserPhoto, writeUserPhoto } from "./services";

function* editUserPhotoSaga(action: PayloadAction<IFileUserPhoto>) {
  const userPhotoFormat = action.payload.photo;
  // const reg = /^(.*\.(?!(htm|html|class|js)$))?[^.]*$/i;
  console.log(userPhotoFormat);

  // if (userPhotoFormat.type === "image/jpeg" || userPhotoFormat.type === "image/png") {
  //   console.log("ok");
  // } else {
  //   console.log("wrong file format!!!");
  // }
  if (userPhotoFormat.type !== "image/jpeg" && userPhotoFormat.type !== "image/png") {
    // let photoError = error.message;

    // throw new SyntaxError("Incorrect file format!");
    yield put(uploadUserPhotoFailed({ photoError: "Incorrect file format!" }));
    return

  }

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