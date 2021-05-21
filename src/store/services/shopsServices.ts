import fire from "../../firebaseConfig";
import { IShop } from "../../types";
import firebase from 'firebase';


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