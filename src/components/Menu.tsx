import { useMemo, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

import { useFirebaseAuth } from "./../hooks/useFirebaseAuth";

const Menu = () => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const { user, logout } = useFirebaseAuth();
  const userInitials = useMemo(() => {
    const displayName = user?.providerData?.[0]?.displayName;
    if (displayName) {
      const names = displayName.split(" ");
      return names
        .map((name) => name.charAt(0))
        .join("")
        .substring(0, names.length == 1 ? 1 : 2);
    }
    return user?.email.substring(0, 2);
  }, [user]);
  const userPhotoUrl = useMemo(() => user?.providerData?.[0]?.photoURL, [user]);
  const menuRef = useRef();

  const handleLogout = () => {
    logout();
  };

  const hideMenu = () => {
    setVisibleMenu(false);
  };

  useOutsideClick(menuRef, hideMenu);

  return (
    <div ref={menuRef} className="menu">
      <div
        className="menu-trigger"
        style={
          userPhotoUrl
            ? { backgroundImage: `url(${userPhotoUrl})` }
            : { backgroundColor: "rgb(12, 148, 238)" }
        }
        onClick={() => {
          setVisibleMenu((visibleMenu) => !visibleMenu);
        }}
      >
        {userPhotoUrl ? "" : userInitials?.toUpperCase()}
      </div>
      {visibleMenu && (
        <div className="menu-body">
          <div className="menu-body_email">{user?.email}</div>
          <button
            className="logout-button"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
export { Menu };
