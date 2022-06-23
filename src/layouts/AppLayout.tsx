import { useScreenDimensions } from "use-screen-dimensions";
import { Outlet } from "react-router-dom";

import { TwilioProvider } from "../containers/TwilioProvider";
import { NavBar } from "../components/NavBar";

const AppLayout = () => {
  const { height } = useScreenDimensions();

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
