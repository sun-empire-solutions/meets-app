import { useContext } from "react";

import { TwilioContext } from "../context/TwilioContext";
import { TrackButton } from "./TrackButton";

const TrackButtons = () => {
  const {
    localVideoTrackPublication,
    localAudioTrackPublication,
    isAudioEnabled,
    isVideoEnabled,
    toggleAudioTrack,
    toggleVideoTrack,
  } = useContext(TwilioContext);

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
