import { useContext } from "react";

import { TwilioContext } from "../context/TwilioContext";
import { TrackButton } from "./TrackButton";

const TrackButtons = () => {
  const {
    localVideoTrackPublication,
    localAudioTrackPublication,
    toggleVideoTrack,
    toggleAudioTrack,
  } = useContext(TwilioContext);

  return (
    <div className="track-buttons">
      <TrackButton
        type="camera"
        isActive={localVideoTrackPublication?.isTrackEnabled}
        onClick={toggleVideoTrack}
      />
      <TrackButton
        type="mic"
        isActive={localAudioTrackPublication?.track.isEnabled}
        onClick={toggleAudioTrack}
      />
    </div>
  );
};

export { TrackButtons };
