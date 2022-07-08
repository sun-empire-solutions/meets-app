import { useEffect, useMemo, useState } from "react";
import { Participant, RemoteParticipant } from "twilio-video";

import { useTwilioContext } from "../context";

const useParticipants = () => {
  const { room } = useTwilioContext();

  const remoteParticipants = useMemo(
    () => Array.from(room?.participants.values() ?? []),
    [room]
  );

  const localParticipant = useMemo(() => room?.localParticipant, [room]);

  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    setParticipants([...remoteParticipants, localParticipant]);
  }, [remoteParticipants, localParticipant]);

  useEffect(() => {
    if (room) {
      const participantConnected = (participant: RemoteParticipant) =>
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          participant,
        ]);
      const participantDisconnected = (participant: RemoteParticipant) => {
        alert(`Participant ${participant.identity} has disconnected from room`);
        setParticipants((prevParticipants) =>
          prevParticipants.filter((p) => p !== participant)
        );
      };

      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);

      return () => {
        room.off("participantConnected", participantConnected);
        room.off("participantDisconnected", participantDisconnected);
      };
    }
  }, [room]);

  return { participants };
};

export { useParticipants };
