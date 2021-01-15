import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShop } from "../../types";
import { signOut } from "../sagas/services";
import {
  IShopsRecieved,
  IAuthorizeRequested,
  IAuthorizeRecieved,
  IRegistrAuthError,
  IRegisterRequested,
  IUniqueUserData,
  IUserData,
} from "./actionTypes";

interface IUser {
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
    shopsRequested(state: IInitialState) {
      state.loading = true;
    },
    shopsRecieved(state: IInitialState, action: PayloadAction<IShopsRecieved>) {
      state.loading = false;
      state.shops = action.payload.shops;
    },
    shopsFailed(state: IInitialState) {
      state.loading = false;
    },
    authorizeRequested(
      state: IInitialState,
      action: PayloadAction<IAuthorizeRequested>
    ) {
      state.loading = true;
    },
    authorizeRecieved(
      state: IInitialState,
      action: PayloadAction<IAuthorizeRecieved>
    ) {
      state.isAuth = true;
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
      state.loading = false;
      state.emailError = "";
      state.passwordError = "";
    },
    authorizeFailed(
      state: IInitialState,
      action: PayloadAction<IRegistrAuthError>
    ) {
      state.isAuth = false;
      state.emailError = action.payload.emailError;
      state.passwordError = action.payload.passwordError;
      state.loading = false;
    },
    signOutRequested(state: IInitialState) {
      signOut();
      state.isAuth = false;
      state.user.email = "";
      state.user.lastName = "";
      state.user.firstName = "";
      state.user.uid = "";
    },
    registerRequested(
      state: IInitialState,
      action: PayloadAction<IRegisterRequested>
    ) {
      state.loading = true;
    },
    registerRecieved(
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
    registerFailed(
      state: IInitialState,
      action: PayloadAction<IRegistrAuthError>
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
    profileDataRequested(state: IInitialState) {
      state.loading = true;
    },
    profileDataRecieved(
      state: IInitialState,
      action: PayloadAction<IUserData>
    ) {
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
    },
    profileDataFailed(state: IInitialState) {
      state.loading = false;
    },
    checkAuthorizedRequested(state: IInitialState) {
      state.loading = true;
    },
    userAuthorized(
      state: IInitialState,
      action: PayloadAction<IUniqueUserData>
    ) {
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
      state.isAuth = true;
      state.loading = false;
    },
    userNotAuthorized(state: IInitialState) {
      state.loading = false;
    },
    initProfilePage(state: IInitialState) {
      state.loading = true;
    },
  },
});

export const {
  shopsRequested,
  shopsRecieved,
  shopsFailed,
  authorizeFailed,
  authorizeRecieved,
  authorizeRequested,
  signOutRequested,
  registerRequested,
  registerRecieved,
  registerFailed,
  clearErrors,
  profileDataRequested,
  profileDataRecieved,
  profileDataFailed,
  checkAuthorizedRequested,
  userAuthorized,
  userNotAuthorized,
  initProfilePage,
} = shopsSlice.actions;
export const { reducer } = shopsSlice;
