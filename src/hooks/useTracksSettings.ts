import { useEffect, useState } from "react";
import { saveToStorage } from "../services/storage";

const VIDEO_STREAM_KEY = "TWILIO:VS";
const AUDIO_STREAM_KEY = "TWILIO:AS";

const useTracksSettings = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const saveAudioSettings = (isEnabled: boolean) => {
    saveToStorage(AUDIO_STREAM_KEY, isEnabled);
  };

  const saveVideoSettings = (isEnabled: boolean) => {
    saveToStorage(VIDEO_STREAM_KEY, isEnabled);
  };

  useEffect(() => {
    const videoStream = localStorage.getItem(VIDEO_STREAM_KEY);
    const audioStream = localStorage.getItem(AUDIO_STREAM_KEY);
    if (videoStream) {
      setIsVideoEnabled(JSON.parse(videoStream));
    }
    if (audioStream) {
      setIsAudioEnabled(JSON.parse(audioStream));
    }
  }, []);

  return {
    isAudioEnabled,
    isVideoEnabled,
    saveAudioSettings,
    saveVideoSettings,
  };
};

export { useTracksSettings };
