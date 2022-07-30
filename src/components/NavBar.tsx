import { useMemo } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

import { Menu } from "@/components";

import { Button } from "./Button";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignInView = useMemo(() => location.pathname === "/", [location]);
  const isMeetingView = useMemo(
    () => location.pathname === "/meeting",
    [location]
  );
  const isLobbyView = useMemo(() => location.pathname === "/lobby", [location]);
  const isNavbarVisible = useMemo(
    () => !(isSignInView || isMeetingView),
    [isSignInView, isMeetingView]
  );

  const goBack = () => {
    navigate(-1);
  };

  if (!isNavbarVisible) {
    return null;
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        {isLobbyView && (
          <Button
            classNames="go-back-button"
            icon={<IoIosArrowBack size={24} />}
            onClick={goBack}
          />
        )}
      </div>
      <div className="navbar-right">
        <Menu />
      </div>
    </div>
  );
};
export { NavBar };
