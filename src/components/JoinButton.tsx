import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ring } from "@uiball/loaders";

import { useAuthUser, useMeetingCode } from "@/hooks";
import { useTwilioContext } from "@/context";

import { Button } from "./Button";

const JoinButton = () => {
  const navigate = useNavigate();
  const { user } = useAuthUser();
  const { meetingCode } = useMeetingCode();
  const { connect } = useTwilioContext();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleJoinClick = () => {
    const { displayName, email } = user;
    setIsConnecting(true);
    connect(displayName ?? email, meetingCode)
      .then(() => {
        setIsConnecting(false);
        navigate("/meeting");
      })
      .catch((err) => {
        setIsConnecting(false);
        console.error(err.message);
      });
  };

  return (
    <Button
      classNames="join-button"
      icon={
        isConnecting ? (
          <Ring size={26} lineWeight={5} speed={2} color="white" />
        ) : null
      }
      text={isConnecting ? "" : "Join"}
      onClick={handleJoinClick}
    />
  );
};

export { JoinButton };
