import { useEffect, useRef } from "react";
import { createLocalVideoTrack } from "twilio-video";

const LobbyPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
      <h1>LobbyPage</h1>
      <video
        ref={videoRef}
        id="localVideo"
        src=""
        width={400}
        height={200}
      ></video>
    </div>
  );
};

export { LobbyPage };
