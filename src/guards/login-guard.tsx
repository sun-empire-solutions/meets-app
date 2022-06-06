import { Navigate } from "react-router-dom";

import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

const withLoginGuard = (component: JSX.Element) => {
  const { user, isAuthReady } = useFirebaseAuth();

  if (!isAuthReady) {
    return null;
  }

  if (user) {
    return <Navigate to="/lobby" />;
  }

  return component;
};

export { withLoginGuard };
