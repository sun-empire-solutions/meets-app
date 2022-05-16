import { useState } from "react";

import { TrackButton } from "./TrackButton";

const TrackButtons = () => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);

  return (
    <div className="track-buttons">
      <TrackButton
        type="camera"
        isActive={isVideoEnabled}
        onClick={() => setIsVideoEnabled((video) => !video)}
      />
      <TrackButton
        type="mic"
        isActive={isMicEnabled}
        onClick={() => setIsMicEnabled((mic) => !mic)}
      />
    </div>
  );
};

export { TrackButtons };
