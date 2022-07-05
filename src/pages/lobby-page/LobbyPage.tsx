import { useEffect } from "react";

import { LobbyButtons } from "../../components";
import { useTwilioContext } from "../../context";

import { LocalVideoPreview } from "./components/LocalVideoPreview";

const LobbyPage = () => {
  const {
    getVideoSettings,
    getLocalVideoTrack,
    removeLocalVideoTrack,
    isAcquiringLocalTracks,
  } = useTwilioContext();

  useEffect(() => {
    const isVideoEnabled = getVideoSettings();

    if (isVideoEnabled) {
      getLocalVideoTrack();
    }

    return () => {
      removeLocalVideoTrack();
    };
  }, []);

  return (
    <div className="container">
      <LocalVideoPreview />
      <LobbyButtons />
    </div>
  );
};

export { LobbyPage };
