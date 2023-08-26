import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  User,
  UserCredential,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  updateProfile,
  updateEmail,
  updatePassword,
  linkWithCredential,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { unusableUsernames } from "../Utils";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;



const firebaseConfig = {
  apiKey: apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();

const db = getFirestore(app);

export const createUserProfileDocument = async (userAuth: User, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
additionalData: any) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {

    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date().toISOString()

    const followers: Array<string> = [];
    const following: Array<string> = [];
    const userType = "writer";
    const lastLogin = serverTimestamp();
    //const bookmarkedPosts: Array<string> | undefined = [];


    //Generate username from email
    if (email) {
      const username = email.split("@")[0].replace(/[^a-z]/g, "");
      if (!username || unusableUsernames.includes(username)) return;
      let usernameTaken = true;
      let usernameToSave = username;
      let i = 1;

      // Check if username is already taken
      while (usernameTaken) {
        const querySnapshot = await getDocs(
          query(
            collection(db, "users"),
            where("username", "==", usernameToSave)
          )
        );
        if (querySnapshot.empty) {
          usernameTaken = false;
        } else {
          usernameToSave = username + i;
          i++;
        }
      }

      try {
        await setDoc(userRef, {
          displayName,
          email,
          photoURL,
          createdAt,
          followers,
          following,
          userType,
          lastLogin,
          //bookmarkedPosts,
          username: usernameToSave, // set the final value of usernameToSave
          ...additionalData,
        });
        //await updateDoc(userRef, { lastLoginAt});
      } catch (error: unknown) {
        console.log("error creating user", (error as Error).message);
      }
    } else {
      const username = displayName?.replace(/\s+/g, "").toLowerCase();
      if (!username || unusableUsernames.includes(username)) return;
      let usernameTaken = true;
      let usernameToSave = username;
      let i = 1;

      // Check if username is already taken
      while (usernameTaken) {
        const querySnapshot = await getDocs(
          query(
            collection(db, "users"),
            where("username", "==", usernameToSave)
          )
        );
        if (querySnapshot.empty) {
          usernameTaken = false;
        } else {
          usernameToSave = username + i;
          i++;
        }
      }

      try {
        await setDoc(userRef, {
          displayName, //no forget to have john for users with no displayName
          email,
          photoURL,
          createdAt,
          followers,
          following,
          userType,
          lastLogin,
          //bookmarkedPosts,
          username: usernameToSave, // set the final value of usernameToSave
          ...additionalData,
        });
        //await updateDoc(userRef, { lastLoginAt});
      } catch (error: unknown) {
        console.log("error creating user", (error as Error).message);
      }
    }

    // Check if username is "muzardemoses" and if user is not already following "muzardemoses"

    if (email && email.toLowerCase() !== "muzardemoses@gmail.com") {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users"),
          where("email", "==", "muzardemoses@gmail.com")
        )
      );
      if (!querySnapshot.empty) {
        const muzarUser = querySnapshot.docs[0];
        const muzarUserId = muzarUser.id;
        const muzarData = muzarUser.data();
        const muzarFollowers = muzarData.followers || [];
        const muzarFollowing = muzarData.following || [];

        // Check if user is not already following "muzardemoses"
        if (!muzarFollowing.includes(userAuth.uid)) {
          // Add user to "muzardemoses" list of followers
          await updateDoc(doc(db, "users", muzarUserId), {
            followers: [...muzarFollowers, userAuth.uid],
          });

          // Add "muzardemoses" to user's list of following
          await updateDoc(userRef, {
            following: [...following, muzarUserId],
          });
        }
      }
    }
  }
  return userRef;
}

export type {
  User,
  UserCredential
};


export {
  auth,
  storage,
  analytics,
  googleProvider,
  twitterProvider,
  githubProvider,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  db,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  updateProfile,
  updateEmail,
  updatePassword,
  linkWithCredential,
  reauthenticateWithCredential,
};

