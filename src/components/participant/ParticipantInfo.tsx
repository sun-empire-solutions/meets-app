import { useMemo } from "react";
import { BsMicMuteFill } from "react-icons/bs";
import {
  AudioTrack,
  LocalVideoTrack,
  Participant,
  RemoteVideoTrack,
} from "twilio-video";

import {
  useIsTrackSwitchedOff,
  useParticipantIsReconnecting,
  usePublications,
  useTrack,
} from "@/hooks";
import { ParticipantAvatar } from "@/components";

const ParticipantInfo = ({
  participant,
  children,
  isLocalParticipant,
}: IProps) => {
  const { publications } = usePublications(participant);

  const trackPublication = publications.find((p) => p.kind === "audio");

  const audioTrack = useTrack(trackPublication);

  const isMuted = useMemo(
    () => !(audioTrack as AudioTrack)?.isEnabled,
    [audioTrack]
  );

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
        {isLocalParticipant ? "You" : participant.identity}
      </div>
      {isMuted && (
        <div className="muted-indicator">
          <BsMicMuteFill size={16} color="white" />
        </div>
      )}
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
