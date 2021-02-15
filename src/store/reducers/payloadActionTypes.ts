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

export interface IUserName {
  firstName: string,
  lastName: string,
}

export interface IUserPhoto {
  userPhoto: string,
}

export interface IUserData extends IUserName, IUserPhoto { }

export interface IRequestAuthorization extends IUserEmail, IUserPassword { }

export interface IRequestAuthorizationFailed {
  emailError: string;
  passwordError: string;
}

export interface IRequestAuthorizationSuccessful extends IUniqueUserData, IRequestAuthorizationFailed {
  isAuth: boolean;
  loading: boolean;
}

export interface IFileUserPhoto extends IUserName {
  photo: File,
}

export interface IRequestRegistration extends IRequestAuthorization, IUserName { }

export interface IEditEmailFailed {
  emailError: string;
}

export interface IEditPasswordFailed {
  passwordError: string;
}

export interface IUploadUserPhotoFailed {
  photoError: string;
}
