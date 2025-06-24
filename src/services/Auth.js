// src/lib/auth.js
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth"; // 👈 Add this at the top
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";


export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const handleLogout = async () => {
  await signOut(auth);
  navigate("/");
};

export const registerUser = async (email, password, name, phone) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const initialsURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

  await updateProfile(user, {
  displayName: name,
  photoURL: initialsURL,
});
  
  // Save extra info to Firestore
  await setDoc(doc(db, "users", user.uid), {
    email,
    name,
    phone,
    provider: "email",
    photoURL: initialsURL,
    createdAt: Timestamp.now(),
    uid: user.uid,
  });

  return user;
};

export const resetPassword = (email) =>
  sendPasswordResetEmail(auth, email);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  
  // Only write to Firestore if this is a new user
  if (!userSnap.exists()) {
      await setDoc(userRef, {
          fullName: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
          createdAt: Timestamp.now(),
          provider: "google",
          uid: user.uid,
    });
  }

  return user; // return the user for additional use if needed
};