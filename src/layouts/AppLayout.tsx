import { Outlet } from "react-router-dom";

import { TwilioProvider } from "../containers/TwilioProvider";
import { NavBar } from "../components/NavBar";

const AppLayout = () => {
  return (
    <TwilioProvider>
      <div className="app-layout">
        <NavBar />
        <Outlet />
      </div>
    </TwilioProvider>
  );
};

export { AppLayout };
