import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";

const checkTokenExistence = async (token) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(FIREBASE_DB, "patients"),
        where("token", "==", token),
        limit(1)
      )
    );
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking token existence:", error);
    return false;
  }
};

const getUserFromToken = async (token) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(FIREBASE_DB, "patients"),
        where("token", "==", token),
        limit(1)
      )
    );

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user from token:", error);
    return null;
  }
};

const newDoc = async (collectionName, uid, data) => {
  try {
    await setDoc(doc(FIREBASE_DB, collectionName, uid), data);
  } catch (err) {
    console.error("Error creating new document:", err);
  }
};

export const CLOUD = {
  checkTokenExistence,
  getUserFromToken,
  newDoc,
};
