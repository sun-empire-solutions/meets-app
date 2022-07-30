import { ParticipantAvatar, VideoTrack } from "@/components";
import { useTwilioContext } from "@/context";

const LocalVideoPreview = () => {
  const { videoTrack } = useTwilioContext();

  return videoTrack ? (
    <VideoTrack track={videoTrack} isLocal />
  ) : (
    <ParticipantAvatar isLocal />
  );
};

export { LocalVideoPreview };
