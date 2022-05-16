import { TrackButtons } from "./TrackButtons";
import { JoinButton } from "./JoinButton";

const LobbyButtons = () => (
  <div className="lobby-buttons">
    <TrackButtons />
    <JoinButton text="Join" onClick={() => ""} />
  </div>
);

export { LobbyButtons };
