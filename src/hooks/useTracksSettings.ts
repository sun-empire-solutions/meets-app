import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../services/storage";

const VIDEO_STREAM_KEY = "TWILIO:VS";
const AUDIO_STREAM_KEY = "TWILIO:AS";

const useTracksSettings = (): TrackSettings => {
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(null);

  const saveAudioSettings = (isEnabled: boolean) => {
    setIsAudioEnabled(isEnabled);
    saveToStorage(AUDIO_STREAM_KEY, isEnabled);
  };

  const saveVideoSettings = (isEnabled: boolean) => {
    setIsVideoEnabled(isEnabled);
    saveToStorage(VIDEO_STREAM_KEY, isEnabled);
  };

  const getAudioSettings = () => {
    return getFromStorage(AUDIO_STREAM_KEY) ?? true;
  };

  const getVideoSettings = () => {
    return getFromStorage(VIDEO_STREAM_KEY) ?? true;
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
    getAudioSettings,
    getVideoSettings,
  };
};

export type TrackSettings = {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  saveAudioSettings: (isEnabled: boolean) => void;
  saveVideoSettings: (isEnabled: boolean) => void;
  getAudioSettings: () => boolean;
  getVideoSettings: () => boolean;
};

export { useTracksSettings };
