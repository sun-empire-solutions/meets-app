import { useCallback, useEffect, useMemo, useState } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  onAuthStateChanged,
  User,
  Auth,
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";

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
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp>(null);
  const auth = useMemo(
    () => (firebaseApp ? getAuth(firebaseApp) : null),
    [firebaseApp]
  );

  const login = useCallback(
    () => (enail, password) => {
      console.log("AUTH", auth);

      if (auth) {
        signInWithEmailAndPassword(auth, enail, password)
          .then((u) => {
            console.log("login success", u);
            console.log("login success", u.user);

            setUser(u.user);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    [auth]
  );

  const signup = (enail, password) => {
    if (auth) {
      createUserWithEmailAndPassword(auth, enail, password)
        .then((u) => {
          setUser(u.user);
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
        setUser(newUser);
        setIsAuthReady(true);
      });
    }
  }, [auth]);

  return { user, isAuthReady, login: login(), signup };
};

export { useFirebaseAuth };
