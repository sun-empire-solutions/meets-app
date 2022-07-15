import { useCallback } from "react";

import { useIsTrackEnabled } from "./useIsTrackEnabled";
import { useTwilioContext } from "../context";
import { useTracksSettings } from "./useTracksSettings";
import { LocalAudioTrack } from "twilio-video";

const useLocalAudioToggle = () => {
  const { audioTrack, getLocalAudioTrack, room, removeLocalAudioTrack } =
    useTwilioContext();
  const localParticipant = room?.localParticipant;
  const isEnabled = useIsTrackEnabled(audioTrack);
  const { saveAudioSettings } = useTracksSettings();

  const toggleAudioEnabled = useCallback(() => {
    if (audioTrack) {
      const localTrackPublication =
        localParticipant?.unpublishTrack(audioTrack);
      localParticipant?.emit("trackUnpublished", localTrackPublication);
      removeLocalAudioTrack();
      saveAudioSettings(false);
      return;
    }
    getLocalAudioTrack()
      .then((track: LocalAudioTrack) => {
        saveAudioSettings(true);
        return localParticipant?.publishTrack(track, { priority: "low" });
      })
      .catch((error) => console.log(error));
  }, [audioTrack]);

  return [isEnabled, toggleAudioEnabled] as const;
};

export { useLocalAudioToggle };
