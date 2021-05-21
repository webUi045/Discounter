import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICardsObj } from "./../actionTypes/cardsPayloadActionTypes";
import {
  IRequestAuthorization,
  IRequestAuthorizationSuccessful,
  IRequestAuthorizationFailed,
  IRequestRegistration,
  IRequestSignOutFailed,
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
} from "../actionTypes/profilePayloadActionTypes";

export interface IUser {
  cards: ICardsObj
  userPhoto: string;
  firstName: string;
  lastName: string;
  email: string;
  uid: string;
  firstNameError: string;
  lastNameError: string;
}

export interface IInitialState {
  loading: boolean;
  user: IUser;
  isAuth: boolean;
  emailError: string;
  passwordError: string;
  authorizationError: string;
  signOutError: string;
  photoError: string;
}

const initialState: IInitialState = {
  loading: true,
  user: {
    cards: {},
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
  signOutError: "",
  photoError: "",
};

const shopsSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    requestAuthorization(
      state: IInitialState,
      action: PayloadAction<IRequestAuthorization>
    ) {
      state.authorizationError = "";
    },

    requestAuthorizationSuccessful(
      state: IInitialState,
      action: PayloadAction<IRequestAuthorizationSuccessful>
    ) {
      state.isAuth = true;
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
    },

    requestAuthorizationFailed(
      state: IInitialState,
      action: PayloadAction<string>
    ) {
      state.isAuth = false;
      state.authorizationError = action.payload;
    },

    requestSignOut(state: IInitialState) {
      state.loading = true;
    },

    requestSignOutSuccessful(state: IInitialState) {
      state.isAuth = false;
      state.user.email = "";
      state.user.lastName = "";
      state.user.firstName = "";
      state.user.userPhoto = "";
      state.user.uid = "";
      state.loading = false;
    },

    requestSignOutFailed(state: IInitialState, action: PayloadAction<IRequestSignOutFailed>) {
      state.signOutError = action.payload.signOutError;
      state.loading = false;
    },

    requestRegistration(
      state: IInitialState,
      action: PayloadAction<IRequestRegistration>
    ) {
      state.user.firstNameError = "";
      state.user.lastNameError = "";
      state.emailError = "";
      state.passwordError = "";
    },

    requestRegistrationSuccessful(
      state: IInitialState,
      action: PayloadAction<IUniqueUserData>
    ) {
      state.isAuth = true;
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
    },

    requestRegistrationFailed(
      state: IInitialState,
      action: PayloadAction<IRequestAuthorizationFailed>
    ) {
      state.isAuth = false;
      state.emailError = action.payload.emailError;
      state.passwordError = action.payload.passwordError;
    },

    clearErrors(state: IInitialState) {
      state.emailError = "";
      state.passwordError = "";
      state.photoError = "";
      state.authorizationError = "";
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
      state.user.lastNameError = "";
      state.user.firstNameError = "";
    },

    editProfileDataSuccessful(
      state: IInitialState,
      action: PayloadAction<IUserName>
    ) {
      state.loading = false;
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
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

    editEmailSuccessful(
      state: IInitialState,
      action: PayloadAction<IUserEmail>
    ) {
      state.user.email = action.payload.email;
      state.loading = false;
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

    editPasswordSuccessful(
      state: IInitialState
    ) {
      state.loading = false;
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
  },
});

export const {
  requestAuthorization,
  requestAuthorizationSuccessful,
  requestAuthorizationFailed,
  requestSignOut,
  requestSignOutSuccessful,
  requestSignOutFailed,
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
  editEmailSuccessful,
  editPassword,
  editPasswordSuccessful,
  editEmailFailed,
  editPasswordFailed,
  editFirstNameFailed,
  editLastNameFailed,
  uploadUserPhotoFailed,
} = shopsSlice.actions;
export const { reducer } = shopsSlice;