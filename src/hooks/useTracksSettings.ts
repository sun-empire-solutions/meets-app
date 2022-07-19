import { getFromStorage, saveToStorage } from "../services/storage";

const VIDEO_STREAM_KEY = "TWILIO:VS";
const AUDIO_STREAM_KEY = "TWILIO:AS";

const useTracksSettings = (): TrackSettings => {
  const saveAudioSettings = (isEnabled: boolean) => {
    saveToStorage(AUDIO_STREAM_KEY, isEnabled);
  };

  const saveVideoSettings = (isEnabled: boolean) => {
    saveToStorage(VIDEO_STREAM_KEY, isEnabled);
  };

  const getAudioSettings = () => {
    return getFromStorage(AUDIO_STREAM_KEY) ?? true;
  };

  const getVideoSettings = () => {
    return getFromStorage(VIDEO_STREAM_KEY) ?? true;
  };

  return {
    saveAudioSettings,
    saveVideoSettings,
    getAudioSettings,
    getVideoSettings,
  };
};

export type TrackSettings = {
  saveAudioSettings: (isEnabled: boolean) => void;
  saveVideoSettings: (isEnabled: boolean) => void;
  getAudioSettings: () => boolean;
  getVideoSettings: () => boolean;
};

export { useTracksSettings };
