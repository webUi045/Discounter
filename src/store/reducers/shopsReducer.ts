import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShop } from "../../types";
import { getUser, logOut } from "../sagas/services";

interface IShopsRecieved {
  shops: IShop[];
}

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  uid: string;
}

interface IInitialState {
  shops: IShop[] | [];
  loading: boolean;
  user: IUser;
  isAuth: boolean;
  signInError: string;
  signUpError: string;
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
  signInError: "",
  signUpError: "",
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
    authorizeRequested(state: IInitialState, action: any) {
      state.loading = true;
    },
    authorizeRecieved(state: IInitialState, action: any) {
      state.isAuth = true;
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
      state.loading = false;
    },
    authorizeFailed(state: IInitialState, action: any) {
      state.isAuth = false;
      state.signInError = action.payload;
      state.loading = false;
    },
    logOutSuccess(state: IInitialState) {
      logOut();
      state.isAuth = false;
      state.user.email = "";
      state.user.lastName = "";
      state.user.firstName = "";
      state.user.uid = "";

    },
    registerRequested(state: IInitialState, action: any) {
      state.loading = true;
    },
    registerRecieved(state: IInitialState, action: any) {
      state.isAuth = true;
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
    },
    registerFailed(state: IInitialState, action: any) {
      state.isAuth = false;
      state.signUpError = action.payload;
    },
    profileDataRequested(state: IInitialState, action: any) {
      state.loading = true;
    },
    profileDataRecieved(state: IInitialState, action: any) {
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
    },
    profileDataFailed(state: IInitialState, action: any) {
      state.loading = false;
    },
    checkAuthorizedRequested(state: IInitialState) {
      state.loading = true;
    },
    userAuthorized(state: IInitialState, action: any) {
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
      state.isAuth = true;
      state.loading = false;
    },
    userNotAuthorized(state: IInitialState) {
      state.loading = false;
    },
    initProfilePage(state: IInitialState){
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
  logOutSuccess,
  registerRequested,
  registerRecieved,
  registerFailed,
  profileDataRequested,
  profileDataRecieved,
  profileDataFailed,
  checkAuthorizedRequested,
  userAuthorized,
  userNotAuthorized,
  initProfilePage
} = shopsSlice.actions;
export const { reducer } = shopsSlice;
