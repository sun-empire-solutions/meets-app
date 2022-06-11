import { useMemo } from "react";
import { Participant } from "../components/Participant";
import { TrackButtons } from "../components/TrackButtons";
import { Button } from "../components/Button";
import { MdCallEnd } from "react-icons/md";
import { useParticipants } from "../hooks/useParticipants";

const MeetingPage = () => {
  const { participants } = useParticipants();
  const size = useMemo(() => participants.length, [participants]);

  const HandelClick = () => {
    console.log("clicked");
  };

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
      <div className="lobby-buttons">
        <Button
          classNames="callend-button"
          icon={<MdCallEnd size={35} />}
          onClick={HandelClick}
        />
        <TrackButtons />
      </div>
    </>
  );
};

export { MeetingPage };
