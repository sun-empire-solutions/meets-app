import { useMemo, useRef, useState } from "react";

import { useClassNames, useOutsideClick, useFirebaseAuth } from "@/hooks";
import { getUserInitials } from "../lib";

const Menu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { user, logout } = useFirebaseAuth();
  const userInitials = useMemo(() => {
    return getUserInitials(user);
  }, [user]);
  const userPhotoUrl = useMemo(() => user?.providerData?.[0]?.photoURL, [user]);
  const menuRef = useRef();
  const classNames = useClassNames();

  const handleLogout = () => {
    logout();
  };

  const hideMenu = () => {
    setIsMenuVisible(false);
  };

  useOutsideClick(menuRef, hideMenu);

  return (
    <div
      ref={menuRef}
      className={classNames("menu", { active: isMenuVisible })}
    >
      <button
        className="menu-trigger"
        role="button"
        style={userPhotoUrl ? {} : { backgroundColor: "rgb(12, 148, 238)" }}
        onClick={() => {
          setIsMenuVisible((visibleMenu) => !visibleMenu);
        }}
      >
        {userPhotoUrl ? (
          <img src={userPhotoUrl} alt="user" referrerPolicy="no-referrer" />
        ) : (
          userInitials?.toUpperCase()
        )}
      </button>
      {isMenuVisible && (
        <div className="menu-body">
          <div className="menu-body_user">
            <div
              className="menu-body_user-photo"
              style={
                userPhotoUrl ? {} : { backgroundColor: "rgb(12, 148, 238)" }
              }
            >
              {userPhotoUrl ? (
                <img
                  src={userPhotoUrl}
                  alt="user"
                  referrerPolicy="no-referrer"
                />
              ) : (
                userInitials?.toUpperCase()
              )}
            </div>
            <div className="menu-body_user-name">{user?.displayName}</div>
            <div className="menu-body_user-email">{user?.email}</div>
          </div>

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
