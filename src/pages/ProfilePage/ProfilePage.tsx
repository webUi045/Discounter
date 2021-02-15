import React, {RefObject, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import {
  clearErrors,
  editEmail,
  editPassword,
  initProfilePage,
  requestSignOut,
  resetUserData,
  uploadUserPhoto,
} from "../../store/reducers/discounterReducer";
import {IInitialState} from "../../store/reducers/discounterReducer";
import {editProfileData} from "../../store/reducers/discounterReducer";
import {FileInput} from "../../shared/FileInput/FileInput";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const {firstName, lastName, email, userPhoto, firstNameError, lastNameError} = useSelector(
    (state: { store: IInitialState }) => state.store.user
  );
  const {emailError, passwordError} = useSelector(
    (state: { store: IInitialState }) => state.store
  );
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [password, setPassword] = useState('');
  const refInputFirstName = useRef<HTMLInputElement | null>(null);
  const refInputLastName = useRef<HTMLInputElement | null>(null);
  const refInputEmail = useRef<HTMLInputElement | null>(null);
  const refInputPassword = useRef<HTMLInputElement | null>(null);

  const changeFirstName = (value: string) => {
    setEditedFirstName(value);
  };

  const changeLastName = (value: string) => {
    setEditedLastName(value);
  };

  const changeEmail = (value: string) => {
    setEditedEmail(value);
  };

  const changePassword = (value: string) => {
    setPassword(value);
  };

  const focusOnFirstName = () => {

    if (refInputFirstName.current) {
      refInputFirstName.current.disabled = false;
      refInputFirstName.current.focus();
    }
  };

  const focusOnLastName = () => {

    if (refInputLastName.current) {
      refInputLastName.current.disabled = false;
      refInputLastName.current.focus();
    }
  };

  const focusOnPassword = () => {

    if (refInputPassword.current) {
      refInputPassword.current.disabled = false;
      refInputPassword.current.focus();
    }
  };

  const focusOnEmail = () => {

    if (refInputEmail.current) {
      refInputEmail.current.disabled = false;
      refInputEmail.current.focus();
    }
  };

  const handleLogout = () => {
    dispatch(requestSignOut());
  };

  const editPersonalData = () => {
    const firstName: string = editedFirstName;
    const lastName: string = editedLastName;
    if (refInputFirstName.current) {
      refInputFirstName.current.disabled = true;
    }

    if (refInputLastName.current) {
      refInputLastName.current.disabled = true;
    }

    dispatch(editProfileData({firstName, lastName}));
  };

  const editUserEmail = () => {
    if (refInputEmail.current) {
      refInputEmail.current.disabled = true;
    }

    dispatch(editEmail({email: editedEmail}));
  }

  const editUserPassword = () => {
    if (refInputPassword.current) {
      refInputPassword.current.disabled = true;
    }
    dispatch(editPassword({password}));
  }

  const getInputFile = (files: FileList) => {
    const firstName: string = editedFirstName;
    const lastName: string = editedLastName;
    const photo: File = files[0]
    dispatch(uploadUserPhoto({firstName, lastName, photo: photo}))
  }

  useEffect(() => {
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
    setEditedEmail(email);
  }, [firstName])

  useEffect(() => {
    dispatch(initProfilePage());
    return () => {
      dispatch(resetUserData());
    }
  }, []);

  return (
    <div className="profile">
      <div className="profile__img-section">
        {
          userPhoto !== "" ? <div className="profile-photo" style={{backgroundImage: `url(${userPhoto})`}}></div> :
            <div className="profile-photo" style={{backgroundImage: `url(/images/user.svg)`}}></div>
        }
        <label className="btn-add-photo">
          Add new photo
          <FileInput
            onChange={getInputFile}
          />
        </label>
      </div>
      <div className="form-section">
        <Input
          type="text"
          placeholder=""
          value={editedFirstName}
          onChange={(value) => changeFirstName(value)}
          onBlur={editPersonalData}
          style={firstNameError ? "profile__input profile-input-error" : "profile__input"}
          disabled
          refInput={refInputFirstName}
        />
        <Button className="btn-edit" onClick={focusOnFirstName}>
          <svg className="button-icon"
               xmlns="http://www.w3.org/2000/svg" height="401pt" viewBox="0 -1 401.52289 401" width="401pt">
            <path
              d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/>
            <path
              d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"/>
          </svg>
        </Button>
        {firstNameError && <p className="input-error">{firstNameError}</p>}
        {firstNameError && focusOnFirstName()}
      </div>
      <div className="form-section">
        <Input
          type="text"
          placeholder=""
          value={editedLastName}
          onChange={(value) => changeLastName(value)}
          onBlur={editPersonalData}
          style={lastNameError ? "profile__input profile-input-error" : "profile__input"}
          disabled
          refInput={refInputLastName}
        />
        <Button className="btn-edit" onClick={focusOnLastName}>
          <svg className="button-icon"
               xmlns="http://www.w3.org/2000/svg" height="401pt" viewBox="0 -1 401.52289 401" width="401pt">
            <path
              d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/>
            <path
              d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"/>
          </svg>
        </Button>
        {lastNameError && <p className="input-error">{lastNameError}</p>}
        {lastNameError && focusOnLastName()}
      </div>
      <div className="form-section">
        <Input
          type="email"
          placeholder=""
          value={editedEmail}
          onChange={(value) => changeEmail(value)}
          onBlur={editUserEmail}
          style={"profile__input"}
          disabled
          refInput={refInputEmail}
        />
        <Button className="btn-edit" onClick={focusOnEmail}>
          <svg className="button-icon"
               xmlns="http://www.w3.org/2000/svg" height="401pt" viewBox="0 -1 401.52289 401" width="401pt">
            <path
              d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/>
            <path
              d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"/>
          </svg>
        </Button>
        <div>{emailError}</div>
      </div>
      <div className="form-section">
        <Input
          type="password"
          placeholder=""
          value={password}
          onChange={(value) => changePassword(value)}
          onBlur={editUserPassword}
          style={"profile__input"}
          disabled
          refInput={refInputPassword}
        />
        <Button className="btn-edit" onClick={focusOnPassword}>
          <svg className="button-icon"
               xmlns="http://www.w3.org/2000/svg" height="401pt" viewBox="0 -1 401.52289 401" width="401pt">
            <path
              d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/>
            <path
              d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"/>
          </svg>
        </Button>
        <div>{passwordError}</div>
      </div>
      <div className="signout">
        <Link to="/">
          <Button onClick={handleLogout} className="btn-form">
            Sign out
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
