import { useMemo } from "react";

import { Participant } from "../components/Participant";
import { useParticipants } from "../hooks/useParticipants";
import { MeetingButtons } from "../components/MeetingButtons";

const MeetingPage = () => {
  const { participants } = useParticipants();
  const size = useMemo(() => participants.length, [participants]);

  return (
    <div className="meeting-page">
      <div className={`grid grid--${size}`}>
        {participants.map((participant, index) => (
          <Participant
            key={participant.sid ?? index}
            participant={participant}
            index={index}
          />
        ))}
      </div>

      <MeetingButtons />
    </div>
  );
};

export { MeetingPage };
