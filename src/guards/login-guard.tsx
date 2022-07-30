import { Navigate } from "react-router-dom";

import { useFirebaseAuth } from "@/hooks";

const withLoginGuard = (component: JSX.Element) => {
  const { user, isAuthReady } = useFirebaseAuth();

  if (!isAuthReady) {
    return null;
  }

  if (user) {
    return <Navigate to="/start" />;
  }

  return component;
};

export { withLoginGuard };
