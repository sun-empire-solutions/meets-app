import { useEffect, useState } from "react";
import { Participant } from "twilio-video";

const useParticipantIsReconnecting = (participant: Participant) => {
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    const handleReconnecting = () => setIsReconnecting(true);
    const handleReconnected = () => setIsReconnecting(false);

    handleReconnected(); // Reset state when there is a new participant

    participant.on("reconnecting", handleReconnecting);
    participant.on("reconnected", handleReconnected);
    return () => {
      participant.off("reconnecting", handleReconnecting);
      participant.off("reconnected", handleReconnected);
    };
  }, [participant]);

  return isReconnecting;
};

export { useParticipantIsReconnecting };
