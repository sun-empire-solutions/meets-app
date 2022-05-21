import { useMemo, useState } from "react";

import { useFirebaseAuth } from "./../hooks/useFirebaseAuth";

const Menu = () => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const { user, logout } = useFirebaseAuth();
  const userInitials = useMemo(() => user?.email.substring(0, 2), [user]);

  const handleClick = () => {
    logout();
  };

  return (
    <div className="menu">
      <div
        className="menu-trigger"
        onClick={() => {
          setVisibleMenu((visibleMenu) => !visibleMenu);
        }}
      >
        {userInitials?.toUpperCase()}
      </div>
      {visibleMenu && (
        <div className="menu-body">
          <div className="menu-body_email">{user?.email}</div>
          <button className="logout-button" type="button" onClick={handleClick}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
export { Menu };
