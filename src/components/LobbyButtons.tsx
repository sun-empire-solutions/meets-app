import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { TrackButtons } from "./TrackButtons";
import { Button } from "./Button";
import { TwilioContext } from "../context/TwilioContext";

const LobbyButtons = () => {
  const navigate = useNavigate();
  const { clearTracks } = useContext(TwilioContext);

  const handleJoinClick = () => {
    navigate("/meeting");
    clearTracks();
  };

  return (
    <div className="lobby-buttons">
      <TrackButtons />
      <Button classNames="join-button" text="Join" onClick={handleJoinClick} />
    </div>
  );
};

export { LobbyButtons };
