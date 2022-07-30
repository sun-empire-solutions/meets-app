import { useLocalAudioToggle, useLocalVideoToggle } from "@/hooks";

import { TrackButton } from "./TrackButton";

const TrackButtons = ({ className }: IProps) => {
  const [isVideoEnabled, toggleVideoTrack] = useLocalVideoToggle();
  const [isAudioEnabled, toggleAudioTrack] = useLocalAudioToggle();

  return (
    <div className={`track-buttons ${className}`}>
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

type IProps = {
  className?: string;
};

export { TrackButtons };
