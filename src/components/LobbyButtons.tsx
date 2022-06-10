import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "twilio-video";

import { TrackButtons } from "./TrackButtons";
import { Button } from "./Button";
import { useAuthUser } from "../hooks/useAuthUser";
import { TwilioContext } from "../context/TwilioContext";

const LobbyButtons = () => {
  const navigate = useNavigate();
  const { user } = useAuthUser();
  const { connect } = useContext(TwilioContext);

  const handleJoinClick = () => {
    const { displayName } = user;
    connect(displayName);
    navigate("/meeting");
  };

  return (
    <div className="lobby-buttons">
      <TrackButtons />
      <Button classNames="join-button" text="Join" onClick={handleJoinClick} />
    </div>
  );
};

export { LobbyButtons };
