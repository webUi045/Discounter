import fire from "../../firebaseConfig";
import { ICard } from "../actionTypes/cardsPayloadActionTypes";
import firebase from 'firebase';


export const fetchCards = (userId: string) => {

  return new Promise((resolve) => {
    let arr: ICard[] = [];
    const db: firebase.database.Reference = fire.database().ref('posts/' + userId + '/cards');
    db.on("value", (snapshot) => {
      snapshot.forEach((card) => {
        let ref = card.val();
        arr.push(ref);
      });
      resolve(arr);
    });
  });
};
// export const addShops = () => {
//   return new Promise((resolve) => {
//     let arr: IShop[] = [];
//     const db: firebase.database.Reference = fire.database().ref("Shops");
    
//     let ref = db.push({
//       name: 'qwe',
//       age: 123,
//     })
//     console.dir(ref.key);
//   });
// };