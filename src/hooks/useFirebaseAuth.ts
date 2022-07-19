import { useCallback, useEffect, useMemo, useState } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { useAuthUser } from "./useAuthUser";
import { clearStorage } from "../services/storage";
import { useToast } from "./useToast";

const firebaseConfig = {
  apiKey: "AIzaSyCkKVKdomv-qAWMGcJq07mW75HG_TTnY_g",
  authDomain: "meets-app-2022.firebaseapp.com",
  databaseURL: "https://meets-app-2022-default-rtdb.firebaseio.com/",
  storageBucket: "meets-app-2022.appspot.com",
  messagingSenderId: "351805840815",
};

const useFirebaseAuth = () => {
  const { user, saveUser } = useAuthUser();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp>(null);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const auth = useMemo(
    () => (firebaseApp ? getAuth(firebaseApp) : null),
    [firebaseApp]
  );
  const { showToast } = useToast();

  const login = useCallback(
    (email, password) => {
      if (auth) {
        signInWithEmailAndPassword(auth, email, password)
          .then((u) => {
            saveUser(u.user);
          })
          .catch(function (error) {
            showToast("error", "Wrong email or password");
          });
      }
    },
    [auth]
  );

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        //console.log(result.user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const loginWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  const signup = (email, password) => {
    if (auth) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((u) => {
          saveUser(u.user);
        })
        .catch(function (error) {
          showToast("error", error.message);
        });
    }
  };

  const logout = () => {
    if (auth) {
      signOut(auth)
        .then(() => {
          clearStorage();
          saveUser(null); //Logged out
        })
        .catch(function (error) {
          showToast("error", error.message);
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

  return {
    user,
    isAuthReady,
    login,
    signup,
    loginWithGoogle,
    loginWithFacebook,
    logout,
  };
};

export { useFirebaseAuth };
