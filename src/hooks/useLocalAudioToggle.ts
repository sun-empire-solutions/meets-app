import { useCallback } from "react";

import { useIsTrackEnabled } from "./useIsTrackEnabled";
import { useTwilioContext } from "../context";
import { useTracksSettings } from "./useTracksSettings";

const useLocalAudioToggle = () => {
  const { audioTrack, getLocalAudioTrack } = useTwilioContext();
  const isEnabled = useIsTrackEnabled(audioTrack);
  const { saveAudioSettings } = useTracksSettings();

  const toggleAudioEnabled = useCallback(() => {
    if (audioTrack) {
      if (audioTrack.isEnabled) {
        audioTrack.disable();
        saveAudioSettings(false);
        return;
      }
      saveAudioSettings(true);
      audioTrack.enable();
    }
    saveAudioSettings(true);
    getLocalAudioTrack();
  }, [audioTrack]);

  return [isEnabled, toggleAudioEnabled] as const;
};

export { useLocalAudioToggle };
