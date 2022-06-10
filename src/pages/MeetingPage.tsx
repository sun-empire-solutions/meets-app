import { useMemo } from "react";
import { Participant } from "../components/Participant";

import { useParticipants } from "../hooks/useParticipants";

const MeetingPage = () => {
  const { participants } = useParticipants();
  const size = useMemo(() => participants.length, [participants]);

  return (
    <>
      <ul className={`grid grid--${size}`}>
        {participants.map((participant, index) => (
          <Participant
            key={participant.sid ?? index}
            participant={participant}
            index={index}
          />
        ))}
      </ul>
    </>
  );
};

export { MeetingPage };
