import { Outlet, useLocation } from "react-router-dom";
import { TwilioProvider } from "../containers/TwilioProvider";
import { NavBar } from "../components/NavBar";
import { useMemo } from "react";

const AppLayout = () => {
  const location = useLocation();
  const isSignInView = useMemo(() => location.pathname === "/", [location]);
  const isMeetingView = useMemo(
    () => location.pathname === "/meeting",
    [location]
  );
  console.log(isSignInView, isMeetingView);

  const isNavbarVisible = useMemo(
    () => !(isSignInView || isMeetingView),
    [isSignInView, isMeetingView]
  );

  return (
    <TwilioProvider>
      <div className="app-layout">
        {isNavbarVisible && <NavBar />}
        <Outlet />
      </div>
    </TwilioProvider>
  );
};

export { AppLayout };
