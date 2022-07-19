import {
  AudioTrack as IAudioTrack,
  LocalTrackPublication,
  Participant,
  RemoteTrackPublication,
  Track,
} from "twilio-video";

import { IVideoTrack } from "../../types";
import { useTrack } from "../../hooks";
import { VideoTrack, AudioTrack } from "../tracks";

const Publication = ({
  publication,
  isLocalParticipant,
  videoOnly,
  videoPriority,
}: IProps) => {
  const track = useTrack(publication);

  if (!track) return null;

  switch (track.kind) {
    case "video":
      return (
        <VideoTrack
          track={track as IVideoTrack}
          priority={videoPriority}
          isLocal={!track.name.includes("screen") && isLocalParticipant}
        />
      );
    case "audio":
      return videoOnly ? null : <AudioTrack track={track as IAudioTrack} />;
    default:
      return null;
  }
};

type IProps = {
  publication: LocalTrackPublication | RemoteTrackPublication;
  participant: Participant;
  isLocalParticipant?: boolean;
  videoOnly?: boolean;
  videoPriority?: Track.Priority | null;
};

export { Publication };
