import { useTwilioContext } from "../context";

import { TrackButton } from "./TrackButton";

const TrackButtons = () => {
  const {
    localVideoTrackPublication,
    localAudioTrackPublication,
    isAudioEnabled,
    isVideoEnabled,
    toggleAudioTrack,
    toggleVideoTrack,
  } = useTwilioContext();

  return (
    <div className="track-buttons">
      <TrackButton
        type="camera"
        isActive={localVideoTrackPublication?.isTrackEnabled || isVideoEnabled}
        onClick={toggleVideoTrack}
      />
      <TrackButton
        type="mic"
        isActive={
          localAudioTrackPublication?.track?.isEnabled || isAudioEnabled
        }
        onClick={toggleAudioTrack}
      />
    </div>
  );
};

export { TrackButtons };
