import {User} from "firebase/auth";
import {useEffect, useState} from "react";

import {getFromStorage, saveToStorage} from "../services/storage";

const USER_KEY = "AUTH_USER";

const useAuthUser = () => {
  const [user, setUser] = useState<User>(null);

  const saveUser = (user: User) => {
    saveToStorage(USER_KEY, user);
    setUser(user);
  };

  useEffect(() => {
    setUser(getFromStorage(USER_KEY));
  }, []);

  return {user, saveUser};
};

export {useAuthUser};
