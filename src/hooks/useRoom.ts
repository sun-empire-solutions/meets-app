import { useEffect, useState } from "react";
import {
  Room,
  connect as twilioConnect,
  createLocalTracks,
} from "twilio-video";

import { getAccessToken } from "../api";
import { useLocalTracks } from "./useLocalTracks";
import { useTracksSettings } from "./useTracksSettings";

const useRoom = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const trackSettings = useTracksSettings();
  const { clearTracks } = useLocalTracks(room, trackSettings);
  const { getAudioSettings, getVideoSettings } = trackSettings;

  const connect = async (username: string) => {
    const accessToken = await getAccessToken(username);

    const tracks = await createLocalTracks({
      audio: getAudioSettings(),
      video: getVideoSettings() ? { facingMode: "user" } : false,
    });

    const room = await twilioConnect(accessToken, {
      tracks,
    });

    setRoom(room);
  };

  useEffect(() => {
    room?.on("disconnected", (room) => {
      clearTracks();
    });
  }, [room]);

  return { room, connect };
};

export { useRoom };
