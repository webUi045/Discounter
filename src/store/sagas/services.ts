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

// export const fetchUser = () => {
//   fire.auth().onAuthStateChanged((user) => {
//     if (user) {
//     console.log(user.uid);
//       return new Promise((resolve) => {
      
//         const db = fire.database().ref("Users");
//         console.log(db);
//         db.on("value", (snapshot) => {
//          console.log(snapshot);
        
//           resolve(snapshot);
//         });
//       });
//     }})
//     }

//     fetchUser();
    


