import { useEffect } from "react";

import { LobbyButtons, ShareButton } from "../../components";
import { useTwilioContext } from "../../context";
import { useMeetingCode } from "../../hooks";

import { LocalVideoPreview } from "./components/LocalVideoPreview";

const LobbyPage = () => {
  const { getAudioAndVideoTracks, removeLocalAudioAndVideoTracks } =
    useTwilioContext();
  const { meetingCode } = useMeetingCode();
  useEffect(() => {
    getAudioAndVideoTracks();

    return () => {
      removeLocalAudioAndVideoTracks();
    };
  }, []);

  return (
    <div className="container">
      <ShareButton meetCode={meetingCode} />
      <LocalVideoPreview />
      <LobbyButtons />
    </div>
  );
};

export { LobbyPage };
