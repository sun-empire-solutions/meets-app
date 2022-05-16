import { useEffect, useRef, useState } from "react";
import { createLocalVideoTrack } from "twilio-video";

import { TrackButton } from "../components/TrackButton";

const LobbyPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);

  const addLocalVideo = async () => {
    const track = await createLocalVideoTrack();
    const video = videoRef.current;
    track.attach(video);
  };

  useEffect(() => {
    addLocalVideo();
  }, []);

  return (
    <div className="container">
      <video
        ref={videoRef}
        id="localVideo"
        src=""
        width={400}
        height={200}
      ></video>
      <TrackButton
        type="camera"
        isActive={isVideoEnabled}
        onClick={() => setIsVideoEnabled((video) => !video)}
      />
    </div>
  );
};

export { LobbyPage };
