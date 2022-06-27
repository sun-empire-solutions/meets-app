import { useMemo, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import randomColor from "randomcolor";
import { useAuthUser } from "../hooks/useAuthUser";
import { useClassNames } from "../hooks/useClassNames";

const ParticipantAvatar = ({ isLocal }: IProps) => {
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

  const avatarIcon = (
    <div className="avatar-icon">
      <FaUserCircle color={randomColor({ luminosity: "dark" })} />
    </div>
  );

  if (!isLocal) {
    return <div className="avatar">{avatarIcon}</div>;
  }

  return (
    <div className="avatar">
      <img
        className={clasNames("avatar-image", { hidden: !imageLoaded })}
        src={userPhotoUrl}
        alt="user photo"
        onError={handleError}
        onLoad={handleLoad}
      />
      {avatarIcon}
    </div>
  );
};

type IProps = {
  isLocal?: boolean;
};

export { ParticipantAvatar };
