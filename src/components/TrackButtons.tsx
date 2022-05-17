import { useContext, useMemo, useState } from "react";
import { TwilioContext } from "../context/TwilioContext";

import { TrackButton } from "./TrackButton";

const TrackButtons = () => {
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const { localTracksPublication, toggleVideoTrack } =
    useContext(TwilioContext);
  const videoTrack = useMemo(
    () => localTracksPublication.find((track) => track?.kind === "video"),
    [localTracksPublication]
  );
  const audioTrack = useMemo(
    () => localTracksPublication.find((track) => track?.kind === "audio"),
    [localTracksPublication]
  );

  return (
    <div className="track-buttons">
      <TrackButton
        type="camera"
        isActive={videoTrack?.isTrackEnabled}
        onClick={toggleVideoTrack}
      />
      <TrackButton
        type="mic"
        isActive={audioTrack?.isTrackEnabled}
        onClick={() => setIsMicEnabled((mic) => !mic)}
      />
    </div>
  );
};

export { TrackButtons };
