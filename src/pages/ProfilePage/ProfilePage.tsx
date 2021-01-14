import React from "react";
import { Link } from "react-router-dom";
import fire from "../../firebaseConfig";
import Button from "../../shared/Button";

const ProfilePage = () => {
  const handleLogout = () => {
    fire.auth().signOut();
  };

  return (
    <>
      <Link to="/">
        <Button onClick={handleLogout} className="btn-form">
          Sign out
        </Button>
      </Link>
    </>
  );
};

export default ProfilePage;
