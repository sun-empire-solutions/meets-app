import { useCallback } from "react";

import { useIsTrackEnabled } from "./useIsTrackEnabled";
import { useTwilioContext } from "../context";

const useLocalAudioToggle = () => {
  const { audioTrack, getLocalAudioTrack } = useTwilioContext();
  const isEnabled = useIsTrackEnabled(audioTrack);

  const toggleAudioEnabled = useCallback(() => {
    if (audioTrack) {
      audioTrack.isEnabled ? audioTrack.disable() : audioTrack.enable();
      return;
    }
    getLocalAudioTrack();
  }, [audioTrack]);

  return [isEnabled, toggleAudioEnabled] as const;
};

export { useLocalAudioToggle };
