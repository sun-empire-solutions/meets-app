import { useState } from "react";
import { Room, connect as twilioConnect } from "twilio-video";

import { getAccessToken } from "../api";

const useRoom = () => {
  const [room, setRoom] = useState<Room | null>(null);

  const connect = async (username: string) => {
    const accessToken = await getAccessToken(username);
    const room = await twilioConnect(accessToken);

    setRoom(room);
  };

  return { room, connect };
};

export { useRoom };
