import { useContext, useEffect, useMemo } from "react";

import { Participant } from "../../components/Participant";
import { useParticipants } from "../../hooks/useParticipants";
import { MeetingButtons } from "../../components/MeetingButtons";
import { MeetingTopActions } from "./components/MeetingTopActions";
import { TwilioContext } from "../../context/TwilioContext";

const MeetingPage = () => {
  const { participants } = useParticipants();
  const size = useMemo(() => participants.length, [participants]);
  const { isVideoEnabled, hasMultipleVideoInputs, setVideoInputDevices } =
    useContext(TwilioContext);

  useEffect(() => {
    setVideoInputDevices();
  }, []);

  return (
    <div className="meeting-page">
      {isVideoEnabled && hasMultipleVideoInputs && <MeetingTopActions />}
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
