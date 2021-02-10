import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import { editEmail, editPassword, initProfilePage, requestSignOut, uploadUserPhoto, } from "../../store/reducers/discounterReducer";
import { IInitialState } from "../../store/reducers/discounterReducer";
import { editProfileData } from "../../store/reducers/discounterReducer";
import { FileInput } from "../../shared/FileInput/FileInput";
import "./ProfilePage.scss";
import { url } from "inspector";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { firstName, lastName, email, userPhoto } = useSelector(
    (state: { store: IInitialState }) => state.store.user
  );

  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabledInputFirstName, setDisabledInputFirstName] = useState(true);
  const [disabledInputLastName, setDisabledInputLastName] = useState(true);
  const [disabledInputEmail, setDisabledInputEmail] = useState(true);
  const [disabledInputPassword, setDisabledInputPassword] = useState(true);

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
  }


  const editUserPassword = () => {
    dispatch(editPassword({ password }));
  }

  const getInputFile = (files: FileList) => {
    const firstName: string = editedFirstName;
    const lastName: string = editedLastName;
    const photo: File = files[0]
    dispatch(uploadUserPhoto({ firstName, lastName, photo: photo }))
  }

  useEffect(() => {
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
    setEditedEmail(email);
  }, [firstName])

  useEffect(() => {
    dispatch(initProfilePage());
  }, []);
  console.log(userPhoto);

  return (
    <div className="profile">
      <div className="profile__img-section">
        {
          userPhoto !== "" ? <div className="profile-photo" style={{ backgroundImage: `url(${userPhoto})` }}></div> :
            <div className="profile-photo" style={{ backgroundImage: `url(/images/user.svg)` }}></div>
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
          onBlur={() => {
            editPersonalData();
            setDisabledInputFirstName(true);
          }}
          style={"profile__input"}
          disabled={disabledInputFirstName}
        />
        <Button className="btn-edit" onClick={() => setDisabledInputFirstName(false)}>Edit</Button>
      </div>
      <div className="form-section">
        <Input
          type="text"
          placeholder=""
          value={editedLastName}
          onChange={(value) => changeLastName(value)}
          onBlur={() => {
            editPersonalData();
            setDisabledInputLastName(true);
          }}
          style={"profile__input"}
          disabled={disabledInputLastName}
        />
        <Button className="btn-edit" onClick={() => setDisabledInputLastName(false)}>Edit</Button>
      </div>
      <div className="form-section">
        <Input
          type="email"
          placeholder=""
          value={editedEmail}
          onChange={(value) => changeEmail(value)}
          onBlur={() => {
            editUserEmail();
            setDisabledInputEmail(true);
          }}
          style={"profile__input"}
          disabled={disabledInputEmail}
        />
        <Button className="btn-edit" onClick={() => setDisabledInputEmail(false)}>Edit</Button>
      </div>
      <div className="form-section">
        <Input
          type="password"
          placeholder=""
          value={password}
          onChange={(value) => changePassword(value)}
          onBlur={() => {
            editUserPassword();
            setDisabledInputPassword(true);
          }}
          style={"profile__input"}
          disabled={disabledInputPassword}
        />
        <Button className="btn-edit" onClick={() => setDisabledInputPassword(false)}>Edit</Button>
      </div>
      <div className="signout">
        <Link to="/">
          <Button onClick={handleLogout} className="btn-form">
            Sign out
          </Button>
        </Link>
      </div>
    </div >
  );
};

export default ProfilePage;
