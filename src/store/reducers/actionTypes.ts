import { IShop } from "../../types";

export interface IShopsRecieved {
  shops: IShop[];
}

export interface IAuthorizeRequested {
  email?: string;
  password?: string;
}

export interface IAuthorizeRecieved {
  isAuth: boolean;
  email: string;
  uid: string;
  loading: boolean;
  emailError: string;
  passwordError: string;
}

export interface IRegisterRequested {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export interface IRegistrAuthError {
  emailError: string;
  passwordError: string;
}

export interface IUniqueUserData {
  email: string;
  uid: string;
}

export interface IUserData {
  firstName: string;
  lastName: string;
}
