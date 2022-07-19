import {
  LoadingIndicator,
  ParticipantAvatar,
  VideoTrack,
} from "../../../components";
import { useTwilioContext } from "../../../context";
import { useTracksSettings } from "../../../hooks";

// TO-DO: Display participant's identity
const LocalVideoPreview = () => {
  const { videoTrack, isAcquiringLocalTracks } = useTwilioContext();
  const { getVideoSettings } = useTracksSettings();
  const isVideoEnabled = getVideoSettings();

  if (isAcquiringLocalTracks && isVideoEnabled) {
    return <LoadingIndicator />;
  }

  return videoTrack ? (
    <VideoTrack track={videoTrack} isLocal />
  ) : (
    <ParticipantAvatar />
  );
};

export { LocalVideoPreview };
