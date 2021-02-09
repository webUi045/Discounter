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
  ISetUserPhoto,
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
    },
    requestProfileData(state: IInitialState) {
      state.loading = true;
    },
    requestProfileDataSuccessful(
      state: IInitialState,
      action: PayloadAction<ISetUserPhoto>
    ) {
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
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
    requestUserAuthorization(
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
      action: PayloadAction<IRequestRegistration>
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
    setUserPhoto(
      state: IInitialState,
      action: PayloadAction<ISetUserPhoto>
    ) {
      state.user.userPhoto = action.payload.userPhoto;
    }
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
  requestUserAuthorization,
  requestUserAuthorizationFailed,
  initProfilePage,
  editProfileData,
  editProfileDataSuccessful,
  uploadUserPhoto,
  setUserPhoto,
} = shopsSlice.actions;
export const { reducer } = shopsSlice;
