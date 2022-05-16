import { useEffect, useRef, useState } from "react";
import { createLocalVideoTrack } from "twilio-video";
import { LobbyButtons } from "../components/LobbyButtons";

import { TrackButton } from "../components/TrackButton";
import { TrackButtons } from "../components/TrackButtons";

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
      <video
        ref={videoRef}
        id="localVideo"
        src=""
        width={400}
        height={200}
      ></video>
      <LobbyButtons />
    </div>
  );
};

export { LobbyPage };
