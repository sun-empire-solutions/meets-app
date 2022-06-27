import { useMemo } from "react";
import { FaUserCircle } from "react-icons/fa";

import { useAuthUser } from "../hooks/useAuthUser";

const ParticipantAvatar = () => {
  const { user } = useAuthUser();
  const userPhotoUrl = useMemo(() => user?.providerData?.[0]?.photoURL, [user]);

  return (
    <div className="avatar">
      {userPhotoUrl ? (
        <img className="avatar-image" src={userPhotoUrl} alt="user photo" />
      ) : (
        <div className="avatar-icon">
          <FaUserCircle />
        </div>
      )}
    </div>
  );
};

export { ParticipantAvatar };
