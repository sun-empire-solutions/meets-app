import { Outlet } from "react-router-dom";

import { TwilioProvider } from "../containers/TwilioProvider";

const AppLayout = () => {
  return (
    <TwilioProvider>
      <div className="app-layout">
        <Outlet />
      </div>
    </TwilioProvider>
  );
};

export { AppLayout };
