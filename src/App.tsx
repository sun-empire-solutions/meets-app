import { StrictMode } from "react";

import { AppRoutes } from "./routes/AppRoutes";

const App = () => {
  return (
    <StrictMode>
      <AppRoutes />
    </StrictMode>
  );
};
export { App };
