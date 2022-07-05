import { ParticipantAvatar, VideoTrack } from "../../../components";
import { useTwilioContext } from "../../../context";

// TO-DO: Display participant's identity
const LocalVideoPreview = () => {
  const { videoTrack, isAcquiringLocalVideoTrack } = useTwilioContext();

  if (isAcquiringLocalVideoTrack) {
    return null;
  }

  return videoTrack ? (
    <VideoTrack track={videoTrack} isLocal />
  ) : (
    <ParticipantAvatar />
  );
};

export { LocalVideoPreview };
