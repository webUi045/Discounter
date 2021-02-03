import fire from "../../firebaseConfig";
import { IShop } from "../../types";
import firebase from '../../../node_modules/firebase'

export const fetchShops = () => {
  return new Promise((resolve) => {
    let arr: IShop[] = [];
    const db: firebase.database.Reference = fire.database().ref("Shops");
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

export const signIn = (email: string, password: string): Promise<firebase.auth.UserCredential> => {
  return fire.auth().signInWithEmailAndPassword(email, password);
};

export const signOut = (): void => {
  fire.auth().signOut();
};

export const signUp = (email: string, password: string): Promise<firebase.auth.UserCredential> => {
  return fire.auth().createUserWithEmailAndPassword(email, password);
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

export const fetchUserData = (uid: string) => {
  return new Promise((resolve) => {
    const db: firebase.database.Reference = fire.database().ref("Users/" + uid);
    db.on("value", (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    });
  });
};

export const isUserAuthorized = (): Promise<{ email: string | null, uid: string } | null> => {
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
