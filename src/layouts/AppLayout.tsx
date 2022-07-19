import { Outlet } from "react-router-dom";
import { useWindowHeight } from "@react-hook/window-size";

import { TwilioProvider } from "../containers/TwilioProvider";
import { NavBar } from "../components/NavBar";

const AppLayout = () => {
  const height = useWindowHeight();

  return (
    <TwilioProvider>
      <div className="app-layout" style={{ height }}>
        <NavBar />
        <Outlet />
      </div>
    </TwilioProvider>
  );
};

export { AppLayout };
