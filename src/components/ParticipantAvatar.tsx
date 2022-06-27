import { useMemo, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import { useAuthUser } from "../hooks/useAuthUser";

const ParticipantAvatar = () => {
  const { user } = useAuthUser();
  const userPhotoUrl = useMemo(() => user?.providerData?.[0]?.photoURL, [user]);
  const [errorOccured, setErrorOccured] = useState(false);

  const handleError = () => {
    setErrorOccured(true);
  };

  return (
    <div className="avatar">
      {userPhotoUrl && !errorOccured ? (
        <img
          className="avatar-image"
          src={userPhotoUrl}
          alt="user photo"
          onError={handleError}
        />
      ) : (
        <div className="avatar-icon">
          <FaUserCircle />
        </div>
      )}
    </div>
  );
};

export { ParticipantAvatar };
