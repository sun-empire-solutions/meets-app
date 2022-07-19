import { LocalVideoTrack } from "twilio-video";
import { useCallback, useState } from "react";

import { useTwilioContext } from "../context";

import { useTracksSettings } from "./useTracksSettings";

const useLocalVideoToggle = () => {
  const { room, videoTrack, getLocalVideoTrack, removeLocalVideoTrack } =
    useTwilioContext();
  const localParticipant = room?.localParticipant;
  const [isPublishing, setIspublishing] = useState(false);
  const { saveVideoSettings } = useTracksSettings();

  const toggleVideoEnabled = useCallback(() => {
    if (!isPublishing) {
      if (videoTrack) {
        const localTrackPublication =
          localParticipant?.unpublishTrack(videoTrack);
        // TODO: remove when SDK implements this event. See: https://issues.corp.twilio.com/browse/JSDK-2592
        localParticipant?.emit("trackUnpublished", localTrackPublication);
        removeLocalVideoTrack();
        saveVideoSettings(false);
        return;
      }
      setIspublishing(true);
      getLocalVideoTrack()
        .then((track: LocalVideoTrack) => {
          saveVideoSettings(true);
          return localParticipant?.publishTrack(track, { priority: "low" });
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIspublishing(false);
        });
    }
  }, [
    videoTrack,
    localParticipant,
    getLocalVideoTrack,
    isPublishing,
    removeLocalVideoTrack,
  ]);

  return [!!videoTrack, toggleVideoEnabled] as const;
};

export { useLocalVideoToggle };
