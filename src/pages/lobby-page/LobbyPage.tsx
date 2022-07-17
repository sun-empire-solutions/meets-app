import { useEffect } from "react";

import { LobbyButtons } from "../../components";
import { useTwilioContext } from "../../context";

import { LocalVideoPreview } from "./components/LocalVideoPreview";

const LobbyPage = () => {
  const { getAudioAndVideoTracks, removeLocalAudioAndVideoTracks } =
    useTwilioContext();

  useEffect(() => {
    getAudioAndVideoTracks();

    return () => {
      removeLocalAudioAndVideoTracks();
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
