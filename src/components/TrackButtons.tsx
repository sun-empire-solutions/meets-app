import { useTwilioContext } from "../context";
import { useLocalVideoToggle } from "../hooks";

import { TrackButton } from "./TrackButton";

const TrackButtons = () => {
  const { isAudioEnabled } = useTwilioContext();
  const [isVideoEnabled, toggleVideoTrack] = useLocalVideoToggle();

  return (
    <div className="track-buttons">
      <TrackButton
        type="camera"
        isActive={isVideoEnabled}
        onClick={toggleVideoTrack}
      />
      <TrackButton type="mic" isActive={isAudioEnabled} onClick={() => {}} />
    </div>
  );
};

export { TrackButtons };
