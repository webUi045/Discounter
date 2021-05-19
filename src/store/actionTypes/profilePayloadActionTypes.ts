import { Cards } from './cardsPayloadActionTypes';

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
  firstName: string;
  lastName: string;
}

export interface IUserPhoto {
  userPhoto: string,
}

export interface IUserCards {
  cards: Cards;
}

export interface IUserData extends IUserName, IUserPhoto, IUserCards { }

export interface IRequestAuthorization extends IUserEmail, IUserPassword { }

export interface IRequestAuthorizationFailed {
  emailError: string;
  passwordError: string;
}

export interface IRequestAuthorizationSuccessful extends IUniqueUserData, IRequestAuthorizationFailed {
  isAuth: boolean;
  loading: boolean;
  cards: Cards
}

export interface IRequestSignOutFailed {
  signOutError: string;
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