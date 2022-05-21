import { useCallback, useEffect, useMemo, useState } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { useAuthUser } from "./useAuthUser";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const useFirebaseAuth = () => {
  const { user, saveUser } = useAuthUser();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp>(null);
  const provider= new GoogleAuthProvider();
  const auth = useMemo(
    () => (firebaseApp ? getAuth(firebaseApp) : null),
    [firebaseApp]
  );

  const login = useCallback(
    (email, password) => {
      if (auth) {
        signInWithEmailAndPassword(auth, email, password)
          .then((u) => {
            saveUser(u.user);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    [auth]
  );

  const loginGoogle=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    //console.log(result.user);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }  


  const signup = (email, password) => {
    if (auth) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((u) => {
          saveUser(u.user);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logout = () => {
    if (auth) {
      signOut(auth)
        .then(() => {
          saveUser(null); //Logged out
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setFirebaseApp(app);
  }, []);

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (newUser) => {
        saveUser(newUser);
        setIsAuthReady(true);
      });
    }
  }, [auth]);

  return { user, isAuthReady, login, signup,loginGoogle, logout };
};

export { useFirebaseAuth };
