import { useMemo, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import { useAuthUser } from "../hooks/useAuthUser";
import { useClassNames } from "../hooks/useClassNames";

const ParticipantAvatar = () => {
  const { user } = useAuthUser();
  const userPhotoUrl = useMemo(() => user?.providerData?.[0]?.photoURL, [user]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);
  const clasNames = useClassNames();

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    setErrorOccured(true);
  };

  return (
    <div className="avatar">
      <img
        className={clasNames("avatar-image", { hidden: !imageLoaded })}
        src={userPhotoUrl}
        alt="user photo"
        onError={handleError}
        onLoad={handleLoad}
      />
      <div className={clasNames("avatar-icon", { hidden: !errorOccured })}>
        <FaUserCircle />
      </div>
    </div>
  );
};

export { ParticipantAvatar };
