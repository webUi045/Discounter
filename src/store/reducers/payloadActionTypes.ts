import { IShop } from "../../types";

export interface IRequestShopsSuccessful {
  shops: IShop[];
}

export interface IUniqueUserData {
  email: string;
  uid: string;
}

export interface IUserData {
  firstName: string;
  lastName: string;
}

export interface IRequestAuthorization {
  email: string;
  password: string;
}

export interface IRequestAuthorizationFailed {
  emailError: string;
  passwordError: string;
}

export interface IRequestAuthorizationSuccessful  extends IUniqueUserData, IRequestAuthorizationFailed{
  isAuth: boolean;
  loading: boolean;
}

export interface IRequestRegistration extends  IRequestAuthorization, IUserData{}
