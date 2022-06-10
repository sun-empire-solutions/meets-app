import { useContext, useState } from "react";
import {
  Room,
  connect as twilioConnect,
  createLocalTracks,
} from "twilio-video";

import { getAccessToken } from "../api";
import { TwilioContext } from "../context/TwilioContext";

const useRoom = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const { isAudioEnabled, isVideoEnabled } = useContext(TwilioContext);

  const connect = async (username: string) => {
    const accessToken = await getAccessToken(username);

    const tracks = await createLocalTracks({
      audio: isAudioEnabled,
      video: isVideoEnabled ? { facingMode: "user" } : false,
    });

    const room = await twilioConnect(accessToken, {
      tracks,
    });

    setRoom(room);
  };

  return { room, connect };
};

export { useRoom };
