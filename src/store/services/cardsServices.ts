import fire from "../../firebaseConfig";
import firebase from "firebase";
import { ICard } from "../actionTypes/cardsPayloadActionTypes";

export const fetchCards = (userId: string) => {
  return new Promise((resolve) => {
    const db: firebase.database.Reference = fire
      .database()
      .ref("Cards/" + userId);
    db.on("value", (snapshot) => {
      const cards = snapshot.val();
      resolve(cards);
    });
  });
};

export const addCard = async (
  userId: string,
  card: ICard
): Promise<string | null> => {
  const db: firebase.database.Reference = fire
    .database()
    .ref("Cards/" + userId);
  let checked = await checkRef(db);

  if (!checked) {
    const db: firebase.database.Reference = fire.database().ref("Cards/");
    let user = {
      [userId]: {},
    };
    await updateRef(db, user[userId]);
  }
  return await pushData(db, card);
};

const checkRef = (ref: firebase.database.Reference) => {
  return new Promise((resolve, reject) => {
    const checked = (snapshot: firebase.database.DataSnapshot) =>
      resolve(snapshot.exists());
    const onError = (error: any) => reject(error);

    ref.on("value", checked, onError);
  });
};

const pushData = (
  ref: firebase.database.Reference,
  card: ICard
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const newRef = ref.push(card, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(newRef.key);
      }
    });
  });
};

const updateRef = async (ref: firebase.database.Reference, obj: Object) => {
  await ref.update(obj);
};
