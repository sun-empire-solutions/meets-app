import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Outlet />
    </div>
  );
};

export { AppLayout };
