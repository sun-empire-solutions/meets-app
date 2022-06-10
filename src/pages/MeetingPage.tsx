import { useParticipants } from "../hooks/useParticipants";

const MeetingPage = () => {
  const { participants } = useParticipants();

  return (
    <div>
      <h1>MeetingPage</h1>
      <ul>
        {participants.map((participant, index) => (
          <li key={participant.sid ?? index}>{participant.identity}</li>
        ))}
      </ul>
    </div>
  );
};

export { MeetingPage };
