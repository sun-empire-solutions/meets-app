import { useContext, useEffect, useMemo, useRef } from "react";
import { createLocalVideoTrack, LocalVideoTrack } from "twilio-video";

import { LobbyButtons } from "../components/LobbyButtons";
import { TwilioContext } from "../context/TwilioContext";

const LobbyPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { localTracksPublication } = useContext(TwilioContext);
  const videoTrack = useMemo(
    () => localTracksPublication.find((track) => track?.kind === "video"),
    [localTracksPublication]
  );

  useEffect(() => {
    if (videoTrack) {
      (videoTrack?.track as LocalVideoTrack)?.attach(videoRef.current);
      return;
    }
    (videoTrack?.track as LocalVideoTrack)?.detach(videoRef.current);
  }, [videoTrack]);

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
