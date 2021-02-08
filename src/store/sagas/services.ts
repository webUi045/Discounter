import fire from "../../firebaseConfig";
import {IShop} from "../../types";
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

export const editUserData = (
  uid: string,
  firstName: string,
  lastName: string,
  userPhoto: string,
) => {
  return fire
    .database()
    .ref("Users/" + uid)
    .set({
      firstName: firstName,
      lastName: lastName,
      userPhoto: userPhoto,
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
        resolve({email: user.email, uid: user.uid});
      } else {
        resolve(null);
      }
    });
  });
};

export const changeEmail = (
  newEmail: string,
): Promise<{ newEmail: string | null } | null> => {
  return new Promise<{ newEmail: string | null } | null>((resolve) => {
      let user = firebase.auth().currentUser;
      if (user) {
        user.updateEmail(newEmail);
        resolve({newEmail})
      }
    }
  );
};

export const changePassword = (
  newPassword: string
): Promise<{ newPassword: string | null } | null> => {
  return new Promise<{ newPassword: string | null } | null>((resolve) => {
      let user = firebase.auth().currentUser;
      if (user) {
        user.updatePassword(newPassword);
        resolve({newPassword})
      }
    }
  );
};

export const editUserPhoto = (file: File, uid: string) => {
  const storageRef = firebase.storage().ref();

  storageRef.child(`${uid}.jpg`).put(file);
  return new Promise((resolve) => {
    const db: firebase.storage.Reference = fire.storage().ref(`${uid}.jpg`);
    const userPhoto = db.getDownloadURL()

    resolve(userPhoto);
  })
}
