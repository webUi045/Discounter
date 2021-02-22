import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {
  IInitialState,
  editProfileData,
  editEmail,
  editPassword,
  initProfilePage,
  requestSignOut,
  uploadUserPhoto,
} from "../../store/reducers/discounterReducer";
import Button from "../../shared/Button";
import EditableInput from "../../shared/EditableInput/EditableInput";
import {FileInput} from "../../shared/FileInput/FileInput";
import loader from "../../assets/images/loader.gif";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const {firstName, lastName, email, userPhoto, firstNameError, lastNameError} = useSelector(
    (state: { store: IInitialState }) => state.store.user
  );
  const {emailError, passwordError, photoError, loading} = useSelector(
    (state: { store: IInitialState }) => state.store
  );
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [password, setPassword] = useState('');

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

    dispatch(editProfileData({firstName, lastName}));
  };

  const editUserEmail = () => {
    dispatch(editEmail({email: editedEmail}));
  }

  const editUserPassword = () => {
    dispatch(editPassword({password}));
  }

  const getInputFile = (files: FileList) => {
    const firstName: string = editedFirstName;
    const lastName: string = editedLastName;
    const photo: File = files[0];

    dispatch(uploadUserPhoto({firstName, lastName, photo: photo}));
  }

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

  return (
    <div className="profile">
      {loading ? <img className="loader" src={loader} alt="loader"/> : <>

        <div className="profile__img-section">
          {
            userPhoto !== "" ? <div className="profile-photo" style={{backgroundImage: `url(${userPhoto})`}}/> :
              <div className="profile-photo" style={{backgroundImage: `url(/images/user.svg)`}}/>
          }
          {photoError !== "" && <p className="photo-error">{photoError}</p>}
          <label className="btn-add-photo">
            Add new photo
            <FileInput
              onChange={getInputFile}
            />
          </label>
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
          <Link to="/">
            <Button onClick={handleLogout} className="btn-form">
              Sign out
            </Button>
          </Link>
        </div>
      </>
      }
    </div>
  );
};

export default ProfilePage;
