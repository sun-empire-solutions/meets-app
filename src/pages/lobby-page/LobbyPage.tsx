import { useEffect } from "react";

import { LoadingIndicator, LobbyButtons, TrackButtons } from "../../components";
import { useTwilioContext } from "../../context";
import { useMeetingCode, useTracksSettings } from "../../hooks";

import { LocalVideoPreview } from "./components/LocalVideoPreview";

const LobbyPage = () => {
  const { getAudioAndVideoTracks, removeLocalAudioAndVideoTracks } =
    useTwilioContext();
  const { isAcquiringLocalTracks } = useTwilioContext();
  const { getVideoSettings } = useTracksSettings();
  const isVideoEnabled = getVideoSettings();
  const { meetingCode } = useMeetingCode();

  useEffect(() => {
    getAudioAndVideoTracks();

    return () => {
      removeLocalAudioAndVideoTracks();
    };
  }, []);

  if (isAcquiringLocalTracks && isVideoEnabled) {
    return <LoadingIndicator />;
  }

  return (
    <div className="lobby-page">
      <div className="lobby-page_top">
        <h3 className="title">{meetingCode}</h3>
      </div>
      <div className="lobby-video-preview">
        <LocalVideoPreview />
        <TrackButtons className="lobby-track-buttons" />
      </div>

      <LobbyButtons />
    </div>
  );
};

export { LobbyPage };
