import fire from "../../firebaseConfig";
import { ICard } from "../actionTypes/cardsPayloadActionTypes";
import firebase from 'firebase';


export const fetchCards = () => {
  return new Promise((resolve) => {
    let arr: ICard[] = [];
    const db: firebase.database.Reference = fire.database().ref("Cards");
    db.on("value", (snapshot) => {
      snapshot.forEach((card) => {
        let item = card.val();
        item.key = card.key;
        arr.push(item);
      });
      resolve(arr);
    });
  });
};