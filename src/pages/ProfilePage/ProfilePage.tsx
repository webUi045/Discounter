import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Avatar, { ConfigProvider } from "react-avatar";

import {
  editProfileData,
  editEmail,
  editPassword,
  initProfilePage,
  requestSignOut,
  uploadUserPhoto,
} from "../../store/reducers/profileReducer";
import Button from "../../shared/Button";
import EditableInput from "../../shared/EditableInput/EditableInput";
import { FileInput } from "../../shared/FileInput/FileInput";
import loader from "../../assets/images/loader.gif";
import "./ProfilePage.scss";
import { RootState } from "../../store/reducers/rootReducer";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const {
    userPhoto,
    firstName,
    lastName,
    email,
    firstNameError,
    lastNameError,
  } = useSelector((state: RootState) => state.profileReducer.user);

  const { isAuth, emailError, passwordError, loading, photoError } =
    useSelector((state: RootState) => state.profileReducer);

  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogout = () => {
    dispatch(requestSignOut());
  };

  const editPersonalData = () => {
    const firstName: string = editedFirstName;
    const lastName: string = editedLastName;

    dispatch(editProfileData({ firstName, lastName }));
  };

  const editUserEmail = () => {
    dispatch(editEmail({ email: editedEmail }));
  };

  const editUserPassword = () => {
    dispatch(editPassword({ password }));
  };

  const getInputFile = (files: FileList) => {
    const firstName: string = editedFirstName;
    const lastName: string = editedLastName;
    const photo: File = files[0];

    dispatch(uploadUserPhoto({ firstName, lastName, photo: photo }));
  };

  useEffect(() => {
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
    setEditedEmail(email);

    // eslint-disable-next-line
  }, [firstName]);

  useEffect(() => {
    dispatch(initProfilePage());

    // eslint-disable-next-line
  }, []);

  if (!isAuth && !loading) {
    return <Redirect exact to="/"></Redirect>;
  } else {
    return (
      <div className="profile">
        {loading ? (
          <img className="loader" src={loader} alt="loader" />
        ) : (
          <>
            <div className="profile__img-section">
              {userPhoto !== "" ? (
                <div
                  className="profile-photo"
                  style={{ backgroundImage: `url(${userPhoto})` }}
                />
              ) : (
                firstName && (
                  <ConfigProvider colors={["#e91e63", "#3f51b5", "#00bcd4"]}>
                    <Avatar
                      className="custom__avatar-profile"
                      name={firstName}
                      round="50%"
                      size="150"
                    />
                  </ConfigProvider>
                )
              )}
              <label className="btn-add-photo">
                Add new photo
                <FileInput onChange={getInputFile} />
              </label>
              {photoError ? (
                <span className="photo-error">{photoError}</span>
              ) : (
                <span className="format-text">
                  Choose formats: PNG, JPG, JPEG
                </span>
              )}
            </div>
            <EditableInput
              type="text"
              placeholder="First name"
              value={editedFirstName}
              onChange={(value) => changeFirstName(value)}
              onBlur={editPersonalData}
              error={firstNameError}
            />
            <EditableInput
              type="text"
              placeholder="Last name"
              value={editedLastName}
              onChange={(value) => changeLastName(value)}
              onBlur={editPersonalData}
              error={lastNameError}
            />
            <EditableInput
              type="email"
              placeholder="Email"
              value={editedEmail}
              onChange={(value) => changeEmail(value)}
              onBlur={editUserEmail}
              error={emailError}
            />
            <EditableInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(value) => changePassword(value)}
              onBlur={editUserPassword}
              error={passwordError}
            />
            <div className="signout">
              <Button onClick={handleLogout} className="btn-form">
                Sign out
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }
};

export default ProfilePage;
