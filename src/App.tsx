import { StrictMode } from "react";

import { AppRoutes } from "./routes/AppRoutes";
import { ToastifyContainer } from "./components";

const App = () => {
  return (
    <StrictMode>
      <AppRoutes />
      <ToastifyContainer />
    </StrictMode>
  );
};
export { App };
