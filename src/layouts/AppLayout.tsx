import { Outlet, useLocation } from "react-router-dom";
import { TwilioProvider } from "../containers/TwilioProvider";
import { NavBar } from "../components/NavBar";
import { useMemo } from "react";

const AppLayout = () => {
  const location = useLocation();
  const NavBarView = useMemo(
    () => location.pathname === "/" || location.pathname === "/meeting",
    [location]
  );

  return (
    <TwilioProvider>
      <div className="app-layout">
        {!NavBarView && <NavBar />}
        <Outlet />
      </div>
    </TwilioProvider>
  );
};

export { AppLayout };
