import { useEffect, useMemo, useState } from "react";
import { Participant, RemoteParticipant } from "twilio-video";

import { useTwilioContext } from "../context";
import { useToast } from "./useToast";

const useParticipants = () => {
  const { room } = useTwilioContext();
  const { showToast } = useToast();

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
        showToast(
          "info",
          `Participant ${participant.identity} has disconnected from room`
        );
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
