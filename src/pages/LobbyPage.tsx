import { useContext, useEffect, useRef } from "react";
import { LocalVideoTrack } from "twilio-video";

import { LobbyButtons } from "../components/LobbyButtons";
import { TwilioContext } from "../context/TwilioContext";

const LobbyPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { localVideoTrackPublication } = useContext(TwilioContext);

  useEffect(() => {
    if (localVideoTrackPublication) {
      (localVideoTrackPublication?.track as LocalVideoTrack)?.attach(
        videoRef.current
      );
      return;
    }
    (localVideoTrackPublication?.track as LocalVideoTrack)?.detach(
      videoRef.current
    );
  }, [localVideoTrackPublication]);

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
