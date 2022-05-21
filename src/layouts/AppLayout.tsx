import { Outlet, useLocation } from "react-router-dom";

import { TwilioProvider } from "../containers/TwilioProvider";
import { NavBar } from "../components/NavBar";

const AppLayout = () => {
  const location = useLocation();
  const isSignInView = location.pathname === "/";

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
