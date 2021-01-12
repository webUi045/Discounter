// import fire from "../../firebaseConfig";

// const fetchShops = () => {
//   return new Promise((resolve) => {
//     const db = fire.database().ref("Shops");
//     db.on("value", (snapshot) => {
//       resolve(snapshot.val());

//     });
//   });
// };

// export default fetchShops;
import fire from "../../firebaseConfig";
import { IShop } from "../../types";

const fetchShops = () => {
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

export default fetchShops;
