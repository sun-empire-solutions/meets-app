import {useEffect, useState} from "react";
import {
  Room,
  connect as twilioConnect,
  createLocalTracks,
} from "twilio-video";

import {getAccessToken} from "../api";
import {useTracksSettings} from "./useTracksSettings";

const useRoom = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const {getAudioSettings, getVideoSettings} = useTracksSettings();

  const connect = async (username: string, roomname: string) => {
    const accessToken = await getAccessToken(username, roomname);

    const tracks = await createLocalTracks({
      audio: getAudioSettings(),
      video: getVideoSettings() ? {facingMode: "user"} : false,
    });

    const room = await twilioConnect(accessToken, {
      tracks,
    });

    setRoom(room);
  };

  useEffect(() => {
    room?.on("disconnected", () => {
      setRoom(null);
    });
  }, [room]);

  return {room, connect};
};

export {useRoom};
