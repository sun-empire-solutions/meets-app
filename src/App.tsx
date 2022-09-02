import { StrictMode } from "react";

import { ToastifyContainer } from "@/components";
import { AppRoutes } from "./routes/AppRoutes";

const App = () => {
  return (
    <StrictMode>
      <AppRoutes />
      <ToastifyContainer />
    </StrictMode>
  );
};

export { App };
