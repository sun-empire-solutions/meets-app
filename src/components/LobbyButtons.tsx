import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ring } from "@uiball/loaders";

import { TrackButtons } from "./TrackButtons";
import { Button } from "./Button";
import { useAuthUser } from "../hooks/useAuthUser";
import { TwilioContext } from "../context/TwilioContext";
import { useMeetingCode } from "../hooks/use-meeting-code";

const LobbyButtons = () => {
  const navigate = useNavigate();
  const { user } = useAuthUser();
  const { meetingCode } = useMeetingCode();
  const { connect } = useContext(TwilioContext);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleJoinClick = () => {
    const { displayName } = user;
    setIsConnecting(true);
    connect(displayName, meetingCode)
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
    <div className="lobby-buttons">
      <TrackButtons />
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
    </div>
  );
};

export { LobbyButtons };
