import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TrackButtons } from "./TrackButtons";
import { Button } from "./Button";
import { useAuthUser } from "../hooks/useAuthUser";
import { TwilioContext } from "../context/TwilioContext";
import { useMeetingCode } from "../pages/join-page/hooks/use-meeting-code";

const LobbyButtons = () => {
  const navigate = useNavigate();
  const { user } = useAuthUser();
  const { meetingCode } = useMeetingCode();
  const { connect } = useContext(TwilioContext);

  const handleJoinClick = () => {
    const { displayName } = user;
    connect(displayName, meetingCode)
      .then(() => {
        navigate("/meeting");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="lobby-buttons">
      <TrackButtons />
      <Button classNames="join-button" text="Join" onClick={handleJoinClick} />
    </div>
  );
};

export { LobbyButtons };
