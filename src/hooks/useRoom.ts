import { useEffect, useState } from "react";
import { Room, connect as twilioConnect, LocalTrack } from "twilio-video";

import { getAccessToken } from "../api";

const useRoom = (localTracks: LocalTrack[]) => {
  const [room, setRoom] = useState<Room | null>(null);

  const connect = async (username: string, roomname: string) => {
    const accessToken = await getAccessToken(username, roomname);

    console.log("accessToken: " + accessToken);

    const room = await twilioConnect(accessToken, {
      tracks: localTracks,
    });

    setRoom(room);
  };

  useEffect(() => {
    room?.on("disconnected", () => {
      setRoom(null);
    });
  }, [room]);

  return { room, connect };
};

export { useRoom };
