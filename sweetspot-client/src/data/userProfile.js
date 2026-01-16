import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const saveUserProfile = async (userId, data) => {
  const ref = doc(db, "users", userId);
  await setDoc(ref, data, { merge: true });
};

export const getUserProfile = async (userId) => {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};
