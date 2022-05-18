import { useNavigate } from "react-router-dom";

import { TrackButtons } from "./TrackButtons";
import { JoinButton } from "./JoinButton";

const LobbyButtons = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/meeting");
  };

  return (
    <div className="lobby-buttons">
      <TrackButtons />
      <JoinButton text="Join" onClick={handleJoinClick} />
    </div>
  );
};

export { LobbyButtons };
