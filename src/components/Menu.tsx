import { useFirebaseAuth } from "./../hooks/useFirebaseAuth";
import { useState, useEffect } from "react";

const Menu = () => {
  const [visibleMenu, setVisibleMenu] = useState(false);

  const { user } = useFirebaseAuth();
  const Email = (user?.email.charAt(0) + user?.email.charAt(1)).toString();

  const HandleClick = () => {
    console.log("DESLOGGIN");
  };

  return (
    <div className="menu">
      <div
        className="container-correo"
        onClick={() => {
          setVisibleMenu((visibleMenu) => !visibleMenu);
        }}
      >
        {Email.toUpperCase()}
      </div>
      {visibleMenu && (
        <div className="menu-correo">
          <div className="correo">{user?.email}</div>
          <div className="logout">
            <button type="button" onClick={HandleClick}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export { Menu };
