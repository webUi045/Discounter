import fire from "../../firebaseConfig";
import firebase from 'firebase';

export const fetchCards = (userId: string) => {

  return new Promise((resolve) => {
    const db: firebase.database.Reference = fire.database().ref('Cards/' + userId);
    db.on("value", (snapshot) => {
      const cards = snapshot.val();
      resolve(cards);
    });
  });
};