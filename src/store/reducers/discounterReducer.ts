import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShop } from "../../types";
import { signOut } from "../sagas/services";
import {
  IRequestShopsSuccessful,
  IRequestAuthorization,
  IRequestAuthorizationSuccessful,
  IRequestAuthorizationFailed,
  IRequestRegistration,
  IUniqueUserData,
  IFileUserPhoto,
  IUserPhoto,
  IUserEmail,
  IUserData,
  IUserPassword,
  IUserName,
  IEditEmailFailed,
  IEditPasswordFailed,
  IUploadUserPhotoFailed,
} from "./payloadActionTypes";

interface IUser {
  userPhoto: string,
  firstName: string;
  lastName: string;
  email: string;
  uid: string;
}

export interface IInitialState {
  shops: IShop[] | [];
  loading: boolean;
  user: IUser;
  isAuth: boolean;
  emailError: string;
  passwordError: string;
  photoError: string;
}

const initialState: IInitialState = {
  shops: [],
  loading: true,
  user: {
    userPhoto: "",
    firstName: "",
    lastName: "",
    email: "",
    uid: "",
  },
  isAuth: false,
  emailError: "",
  passwordError: "",
  photoError: "",
};

const shopsSlice = createSlice({
  name: "DB",
  initialState,
  reducers: {
    requestShops(state: IInitialState) {
      state.loading = true;
    },
    requestShopsSuccessful(state: IInitialState, action: PayloadAction<IRequestShopsSuccessful>) {
      state.loading = false;
      state.shops = action.payload.shops;
    },
    requestShopsFailed(state: IInitialState) {
      state.loading = false;
    },
    requestAuthorization(
      state: IInitialState,
      action: PayloadAction<IRequestAuthorization>
    ) {
      state.loading = true;
    },
    requestAuthorizationSucceessful(
      state: IInitialState,
      action: PayloadAction<IRequestAuthorizationSuccessful>
    ) {
      state.isAuth = true;
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
      state.loading = false;
      state.emailError = "";
      state.passwordError = "";
    },
    requestAuthorizationFailed(
      state: IInitialState,
      action: PayloadAction<IRequestAuthorizationFailed>
    ) {
      state.isAuth = false;
      state.emailError = action.payload.emailError;
      state.passwordError = action.payload.passwordError;
      state.loading = false;
    },
    requestSignOut(state: IInitialState) {
      signOut();
      state.isAuth = false;
      state.user.email = "";
      state.user.lastName = "";
      state.user.firstName = "";
      state.user.uid = "";
    },
    requestRegistration(
      state: IInitialState,
      action: PayloadAction<IRequestRegistration>
    ) {
      state.loading = true;
    },
    requestRegistrationSuccessful(
      state: IInitialState,
      action: PayloadAction<IUniqueUserData>
    ) {
      state.isAuth = true;
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
      state.loading = false;
      state.emailError = "";
      state.passwordError = "";
    },
    requestRegistrationFailed(
      state: IInitialState,
      action: PayloadAction<IRequestAuthorizationFailed>
    ) {
      state.isAuth = false;
      state.emailError = action.payload.emailError;
      state.passwordError = action.payload.passwordError;
      state.loading = false;
    },
    clearErrors(state: IInitialState) {
      state.emailError = "";
      state.passwordError = "";
      state.photoError = "";
    },
    requestProfileData(state: IInitialState) {
      state.loading = true;
    },
    requestProfileDataSuccessful(
      state: IInitialState,
      action: PayloadAction<IUserData>
    ) {
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.loading = false;
      if (action.payload.userPhoto) {
        state.user.userPhoto = action.payload.userPhoto;
      }
    },
    requestProfileDataFailed(state: IInitialState) {
      state.loading = false;
    },
    requestAuthorizationCheck(state: IInitialState) {
      state.loading = true;
    },
    requestUserAuthorizationSuccessful(
      state: IInitialState,
      action: PayloadAction<IUniqueUserData>
    ) {
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
      state.isAuth = true;
      state.loading = false;
    },
    requestUserAuthorizationFailed(state: IInitialState) {
      state.loading = false;
    },
    initProfilePage(state: IInitialState) {
      state.loading = true;
    },
    editProfileData(
      state: IInitialState,
      action: PayloadAction<IUserName>
    ) {
      state.loading = true;
    },
    editProfileDataSuccessful(
      state: IInitialState,
    ) {
      state.loading = false;
    },
    uploadUserPhoto(
      state: IInitialState,
      action: PayloadAction<IFileUserPhoto>
    ) { },
    uploadUserPhotoFailed(
      state: IInitialState,
      action: PayloadAction<IUploadUserPhotoFailed>
    ) {
      state.photoError = action.payload.photoError;
    },
    setUserPhoto(
      state: IInitialState,
      action: PayloadAction<IUserPhoto>
    ) {
      state.user.userPhoto = action.payload.userPhoto;
      state.photoError = "";
    },
    editEmail(
      state: IInitialState,
      action: PayloadAction<IUserEmail>
    ) {
      state.loading = false;
      state.emailError = "";
    },
    editEmailFailed(
      state: IInitialState,
      action: PayloadAction<IEditEmailFailed>
    ) {
      state.emailError = action.payload.emailError;
    },
    editPassword(
      state: IInitialState,
      action: PayloadAction<IUserPassword>
    ) {
      state.loading = false;
    },
    editPasswordFailed(
      state: IInitialState,
      action: PayloadAction<IEditPasswordFailed>
    ) {
      state.passwordError = action.payload.passwordError;
    },
    resetUserData() {
      return initialState;
    },

  },
});

export const {
  requestShops,
  requestShopsSuccessful,
  requestShopsFailed,
  requestAuthorization,
  requestAuthorizationSucceessful,
  requestAuthorizationFailed,
  requestSignOut,
  requestRegistration,
  requestRegistrationSuccessful,
  requestRegistrationFailed,
  clearErrors,
  requestProfileData,
  requestProfileDataSuccessful,
  requestProfileDataFailed,
  requestAuthorizationCheck,
  requestUserAuthorizationSuccessful,
  requestUserAuthorizationFailed,
  initProfilePage,
  editProfileData,
  editProfileDataSuccessful,
  uploadUserPhoto,
  setUserPhoto,
  editEmail,
  editPassword,
  resetUserData,
  editEmailFailed,
  editPasswordFailed,
  uploadUserPhotoFailed,
} = shopsSlice.actions;
export const { reducer } = shopsSlice;
