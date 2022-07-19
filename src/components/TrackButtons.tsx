import { useLocalAudioToggle, useLocalVideoToggle } from "../hooks";

import { TrackButton } from "./TrackButton";

const TrackButtons = () => {
  const [isVideoEnabled, toggleVideoTrack] = useLocalVideoToggle();
  const [isAudioEnabled, toggleAudioTrack] = useLocalAudioToggle();

  return (
    <div className="track-buttons">
      <TrackButton
        type="camera"
        isActive={isVideoEnabled}
        onClick={toggleVideoTrack}
      />
      <TrackButton
        type="mic"
        isActive={isAudioEnabled}
        onClick={toggleAudioTrack}
      />
    </div>
  );
};

export { TrackButtons };
