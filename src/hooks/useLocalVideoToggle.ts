import { LocalVideoTrack } from "twilio-video";
import { useCallback, useState } from "react";

import { useTwilioContext } from "../context";

const useLocalVideoToggle = () => {
  const { room, videoTrack, getLocalVideoTrack, removeLocalVideoTrack } =
    useTwilioContext();
  const localParticipant = room?.localParticipant;
  const [isPublishing, setIspublishing] = useState(false);

  const toggleVideoEnabled = useCallback(() => {
    if (!isPublishing) {
      if (videoTrack) {
        const localTrackPublication =
          localParticipant?.unpublishTrack(videoTrack);
        // TODO: remove when SDK implements this event. See: https://issues.corp.twilio.com/browse/JSDK-2592
        localParticipant?.emit("trackUnpublished", localTrackPublication);
        removeLocalVideoTrack();
      } else {
        setIspublishing(true);
        getLocalVideoTrack()
          .then((track: LocalVideoTrack) =>
            localParticipant?.publishTrack(track, { priority: "low" })
          )
          .catch((error) => console.log(error))
          .finally(() => {
            setIspublishing(false);
          });
      }
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
