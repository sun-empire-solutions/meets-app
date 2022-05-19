import { useNavigate } from "react-router-dom";

import { TrackButtons } from "./TrackButtons";
import { Button } from "./Button";

const LobbyButtons = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
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
