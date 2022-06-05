import { Outlet, useLocation } from "react-router-dom";

import { TwilioProvider } from "../containers/TwilioProvider";
import { NavBar } from "../components/NavBar";
import { useMemo } from "react";

const AppLayout = () => {
  const location = useLocation();
  const isSignInView = useMemo(() => location.pathname === "/", [location]);

  return (
    <TwilioProvider>
      <div className="app-layout">
        {!isSignInView && <NavBar />}
        <Outlet />
      </div>
    </TwilioProvider>
  );
};

export { AppLayout };
