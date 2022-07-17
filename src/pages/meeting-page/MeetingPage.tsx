import { useMemo } from "react";

import { useParticipants, useTracksSettings } from "../../hooks";
import { MeetingButtons, Participant } from "../../components";

import { MeetingTopActions } from "./components";
import { useHasMultipleCameras } from "./hooks";

const MeetingPage = () => {
  const { participants } = useParticipants();
  const size = useMemo(() => participants.length, [participants]);
  const { hasMultipleCameras } = useHasMultipleCameras();
  const { getVideoSettings } = useTracksSettings();
  const isVideoEnabled = getVideoSettings();

  return (
    <div className="meeting-page">
      {isVideoEnabled && hasMultipleCameras && <MeetingTopActions />}
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
