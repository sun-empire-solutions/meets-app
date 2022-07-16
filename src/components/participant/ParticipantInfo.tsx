import { LocalVideoTrack, Participant, RemoteVideoTrack } from "twilio-video";

import {
  useIsTrackSwitchedOff,
  useParticipantIsReconnecting,
  usePublications,
  useTrack,
} from "../../hooks";
import { ParticipantAvatar } from "../ParticipantAvatar";

const ParticipantInfo = ({
  participant,
  children,
  isLocalParticipant,
}: IProps) => {
  const { publications } = usePublications(participant);

  const videoPublication = publications.find(
    (p) => !p.trackName.includes("screen") && p.kind === "video"
  );

  const isVideoEnabled = Boolean(videoPublication);

  const videoTrack = useTrack(videoPublication);
  const isVideoSwitchedOff = useIsTrackSwitchedOff(
    videoTrack as LocalVideoTrack | RemoteVideoTrack
  );

  const isParticipantReconnecting = useParticipantIsReconnecting(participant);

  return (
    <div
      className="participant-info"
      data-cy-participant={participant.identity}
    >
      <div className="participant-identity">
        {participant.identity}
        {isLocalParticipant && " (You)"}
      </div>
      <div className="participant-content">
        {(!isVideoEnabled || isVideoSwitchedOff) && <ParticipantAvatar />}
        {isParticipantReconnecting && <div>Reconnecting...</div>}
        {children}
      </div>
    </div>
  );
};

type IProps = {
  participant: Participant;
  children: React.ReactNode;
  isLocalParticipant?: boolean;
};

export { ParticipantInfo };
