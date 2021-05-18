import fire from "../../firebaseConfig";
import { ICard } from "../actionTypes/cardsPayloadActionTypes";
import firebase from 'firebase';


export const fetchCards = (userId: string) => {

  return new Promise((resolve) => {
    let arr: ICard[] = [];
    const db: firebase.database.Reference = fire.database().ref('Cards/' + userId);
    db.on("value", (snapshot) => {
      snapshot.forEach((card) => {
        let ref = card.val();
        arr.push(ref);
      });
      resolve(arr);
    });
  });
};