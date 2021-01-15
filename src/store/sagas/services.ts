import fire from "../../firebaseConfig";
import { IShop } from "../../types";

export const fetchShops = () => {
  return new Promise((resolve) => {
    let arr: IShop[] = [];
    const db = fire.database().ref("Shops");
    db.on("value", (snapshot) => {
      snapshot.forEach((shop) => {
        let item = shop.val();
        item.key = shop.key;
        arr.push(item);
      });
      resolve(arr);
    });
  });
};

export const signIn = (email: string, password: string) => {
  return fire.auth().signInWithEmailAndPassword(email, password);
  // .catch((err) => {
  //   switch (err.code) {
  //     case "auth/invalid-email":
  //     case "auth/user-disabled":
  //     case "auth/user-not-found":
  //       //setEmailError(err.message);
  //       break;
  //     case "auth/wrong-password":
  //       //setPasswordError(err.message);
  //       break;
  //   }
  // });
};

export const logOut = () => {
  fire.auth().signOut();
};

export const signUp = (email: string, password: string) => {
  return fire.auth().createUserWithEmailAndPassword(email, password);
  // .catch((err) => {
  //   switch (err.code) {
  //     case "auth/email-already-in-use":
  //     case "auth/invalid-email":
  //       //setEmailError(err.message);
  //       break;
  //     case "auth/wrong-password":
  //       //setPasswordError(err.message);
  //       break;
  //   }
  // });
};

export const writeUserData = (
  uid: string,
  firstName: string,
  lastName: string
) => {
  return fire
    .database()
    .ref("Users/" + uid)
    .set({
      firstName: firstName,
      lastName: lastName,
    });
};

export const readUserData = (uid: string) => {
  return new Promise((resolve) => {
    const db = fire.database().ref("Users/" + uid);
    db.on("value", (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    });
  });
};

export const getUser = () => {
  return new Promise((resolve) => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve({ email: user.email, uid: user.uid });
      } else {
        resolve(null);
      }
    });
  });
};
