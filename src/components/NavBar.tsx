import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { Menu } from "./../components/Menu";

const NavBar = () => {
  const location = useLocation();
  const isSignInView = useMemo(() => location.pathname === "/", [location]);
  const isMeetingView = useMemo(
    () => location.pathname === "/meeting",
    [location]
  );

  const isNavbarVisible = useMemo(
    () => !(isSignInView || isMeetingView),
    [isSignInView, isMeetingView]
  );

  if (!isNavbarVisible) {
    return null;
  }

  return (
    <div className="navbar">
      <Menu />
    </div>
  );
};
export { NavBar };
