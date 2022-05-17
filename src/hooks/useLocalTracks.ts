import { useEffect, useState } from "react";
import {
  createLocalVideoTrack,
  LocalTrackPublication,
  LocalVideoTrackPublication,
  Room,
} from "twilio-video";

const useLocalTracks = (room: Room) => {
  const [localTracksPublication, setLocalTracksPublication] = useState<
    LocalTrackPublication[]
  >([]);

  const toggleVideoTrack = () => {
    const videoTrackPublication: LocalVideoTrackPublication =
      localTracksPublication.find(
        (track) => track?.kind === "video"
      ) as LocalVideoTrackPublication;
    if (videoTrackPublication) {
      videoTrackPublication.track.stop();
      videoTrackPublication.unpublish();
      setLocalTracksPublication((tracks) =>
        tracks.filter((track) => track?.kind !== "video")
      );
      return;
    }
    createLocalVideoTrack()
      .then((localVideoTrack) => {
        return room?.localParticipant?.publishTrack(localVideoTrack);
      })
      .then((publication) => {
        setLocalTracksPublication((tracks) => [...tracks, publication]);
        console.log("Successfully unmuted your video:", publication.track);
      });
  };

  useEffect(() => {
    setLocalTracksPublication(
      Array.from(room?.localParticipant?.tracks?.values?.() ?? [])
    );
  }, [room]);

  return {
    localTracksPublication,
    setLocalTracksPublication,
    toggleVideoTrack,
  };
};

export { useLocalTracks };
