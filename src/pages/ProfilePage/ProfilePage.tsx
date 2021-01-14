import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fire from "../../firebaseConfig";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const fetchUserName = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = fire.database().ref("Users/" + user.uid + "/username");
        db.on("value", (snapshot) => {
          const data = snapshot.val();
          setName(data);
        });
      }
    });
  };

  const fetchUserLastName = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = fire.database().ref("Users/" + user.uid + "/userLastName");
        db.on("value", (snapshot) => {
          const data = snapshot.val();
          setLastName(data);
        });
      }
    });
  };

  const fetchUserEmail = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        const userEmail: any = user.email;
        setEmail(userEmail);
      }
    });
  };

  useEffect(() => {
    fetchUserName();
    fetchUserLastName();
    fetchUserEmail();
  }, [name, lastName, email]);

  return (
    <div className="profile">
      <div className="profile__img">
        <span className="logo">P</span>
      </div>
      <Input
        type="text"
        placeholder=""
        value={name}
        onChange={() => console.log("gg")}
        style={"profile__input"}
      />
      <Input
        type="text"
        placeholder=""
        value={lastName}
        onChange={() => console.log("gg")}
        style={"profile__input"}
      />

      <Input
        type="email"
        placeholder=""
        value={email}
        onChange={() => console.log("gg")}
        style={"profile__input"}
      />
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
