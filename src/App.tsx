import { useEffect, useRef } from "react";
import { createLocalVideoTrack } from "twilio-video";

const App = () => {
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
export { App };
