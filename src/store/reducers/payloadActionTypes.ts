import { IShop } from "../../types";

export interface IRequestShopsSuccessful {
  shops: IShop[];
}
export interface IUserEmail {
  email: string;
}
export interface IUserPassword {
  password: string;
}

export interface IUniqueUserData extends IUserEmail {
  uid: string;
}

export interface IUserData {
  firstName: string;
  lastName: string;
}

export interface IRequestAuthorization extends IUserEmail, IUserPassword { }

export interface IRequestAuthorizationFailed {
  emailError: string;
  passwordError: string;
}

export interface IRequestAuthorizationSuccessful extends IUniqueUserData, IRequestAuthorizationFailed {
  isAuth: boolean;
  loading: boolean;
}

export interface IUploadUserPhoto {
  path: string,
}

export interface IFileUserPhoto extends IUserData {
  photo: File,
}

export interface ISetUserPhoto {
  userPhoto: string,
}

export interface IRequestRegistration extends IRequestAuthorization, IUserData {
}
