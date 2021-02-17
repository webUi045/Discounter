import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IShop} from "../../types";
import {signOut} from "../sagas/services";
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
  firstNameError: string,
  lastNameError: string,
}

export interface IInitialState {
  shops: IShop[] | [];
  loading: boolean;
  user: IUser;
  isAuth: boolean;
  emailError: string;
  passwordError: string;
  authorizationError: string,
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
    firstNameError: "",
    lastNameError: "",
  },
  isAuth: false,
  emailError: "",
  passwordError: "",
  authorizationError: "",
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
    requestAuthorizationSuccessful(
      state: IInitialState,
      action: PayloadAction<IRequestAuthorizationSuccessful>
    ) {
      state.isAuth = true;
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
      state.loading = false;
      state.authorizationError = "";
    },
    requestAuthorizationFailed(
      state: IInitialState,
      action: PayloadAction<string>
    ) {
      state.isAuth = false;
      state.authorizationError = action.payload;
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
      state.user.lastNameError = "";
      state.user.firstNameError = "";
    },
    uploadUserPhoto(
      state: IInitialState,
      action: PayloadAction<IFileUserPhoto>
    ) {
    },
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
      state.loading = true;
      state.emailError = "";
    },
    editEmailFailed(
      state: IInitialState,
      action: PayloadAction<IEditEmailFailed>
    ) {
      state.emailError = action.payload.emailError;
      state.loading = false;
    },
    editPassword(
      state: IInitialState,
      action: PayloadAction<IUserPassword>
    ) {
      state.loading = true;
    },
    editPasswordFailed(
      state: IInitialState,
      action: PayloadAction<IEditPasswordFailed>
    ) {
      state.passwordError = action.payload.passwordError;
      state.loading = false;
    },
    editFirstNameFailed(
      state: IInitialState,
      action: PayloadAction<string>
    ) {
      state.user.firstNameError = action.payload;
      state.loading = false;
    },
    editLastNameFailed(
      state: IInitialState,
      action: PayloadAction<string>
    ) {
      state.user.lastNameError = action.payload;
      state.loading = false;
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
  requestAuthorizationSuccessful,
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
  editFirstNameFailed,
  editLastNameFailed,
  uploadUserPhotoFailed,
} = shopsSlice.actions;
export const {reducer} = shopsSlice;
