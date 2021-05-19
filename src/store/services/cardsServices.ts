import fire from "../../firebaseConfig";
import firebase from "firebase";

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

const checkRef = (ref: firebase.database.Reference) => {
  return new Promise((resolve, reject) => {
    const checked = (snapshot: firebase.database.DataSnapshot) => resolve(snapshot.exists());
    const onError = (error: any) => reject(error);

    ref.on('value', checked, onError);
  })
};

const pushData = (
  ref: firebase.database.Reference,
  name: string,
  number: number,
  date: string,
  description: string,
) => {
  return new Promise((resolve, reject) => {
    ref.push({
      name,
      number,
      date,
      description
    }, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(null)
      }
    })
  })
};

const updateRef = async (
  ref: firebase.database.Reference,
  obj: Object
) => {
  await ref.update(obj)
};

export const addCard = async (
  userId: string,
  name: string,
  number: number,
  date: string,
  description: string
) => {
  const db: firebase.database.Reference = fire.database().ref('Cards/' + userId);
  let checked = await checkRef(db)

  if (!checked) {
    const db: firebase.database.Reference = fire.database().ref('Cards/');
    let user = {
      [userId]: {}
    }
    await updateRef(db, user[userId])
  }
  await pushData(db, name, number, date, description)
}
