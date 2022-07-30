import React, { useMemo } from "react";
import { FaUserCircle } from "react-icons/fa";
import randomColor from "randomcolor";

import { useAuthUser } from "@/hooks";
import { getUserInitials } from "../lib";

const ParticipantAvatar = ({ isLocal }: IProps) => {
  const { user } = useAuthUser();
  const userPhotoUrl = useMemo(() => user?.providerData?.[0]?.photoURL, [user]);
  const userInitials = useMemo(() => {
    return getUserInitials(user);
  }, [user]);

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
      {isLocal ? (
        <div
          className="avatar-image"
          style={
            userPhotoUrl
              ? { backgroundImage: `url(${userPhotoUrl})` }
              : { backgroundColor: "rgb(12, 148, 238)" }
          }
        >
          {userPhotoUrl ? "" : userInitials?.toUpperCase()}
        </div>
      ) : (
        <div className="avatar-icon">
          <FaUserCircle color={randomColor({ luminosity: "dark" })} />
        </div>
      )}
    </div>
  );
};

type IProps = {
  isLocal?: boolean;
};

const MemoizedAvatar = React.memo(ParticipantAvatar);

export { MemoizedAvatar as ParticipantAvatar };
