import { useMemo } from "react";
import { Participant as IParticipant } from "twilio-video";

import { useTwilioContext } from "@/context";
import { ParticipantTracks, ParticipantInfo } from "@/components";

const Participant = ({ participant, index }: IProps) => {
  const { room } = useTwilioContext();
  const isLocalParticipant = useMemo(
    () => room?.localParticipant.identity === participant.identity,
    [room, participant]
  );

  return (
    <div hidden className={`participant-wrapper participant-${index}`}>
      <ParticipantInfo
        participant={participant}
        isLocalParticipant={isLocalParticipant}
      >
        <ParticipantTracks
          participant={participant}
          isLocalParticipant={isLocalParticipant}
        />
      </ParticipantInfo>
    </div>
  );
};

type IProps = {
  participant: IParticipant;
  index: number;
};

export { Participant };
