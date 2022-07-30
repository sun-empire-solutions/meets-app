import { Navigate } from "react-router-dom";

import { useFirebaseAuth } from "@/hooks";

const withAuthGuard = (component: JSX.Element) => {
  const { user, isAuthReady } = useFirebaseAuth();

  if (!isAuthReady) {
    return null;
  }

  if (user) {
    return component;
  }

  return <Navigate to="/" />;
};

export { withAuthGuard };
