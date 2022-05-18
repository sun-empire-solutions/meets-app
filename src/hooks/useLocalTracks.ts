import { useEffect, useMemo, useState } from "react";
import {
  createLocalVideoTrack,
  LocalAudioTrack,
  LocalAudioTrackPublication,
  LocalTrackPublication,
  LocalVideoTrack,
  LocalVideoTrackPublication,
  Room,
} from "twilio-video";

const useLocalTracks = (room: Room) => {
  const [localVideoTrackPublication, setLocalVideoTrackPublication] =
    useState<LocalVideoTrackPublication>(null);
  const [localAudioTrackPublication, setLocalAudioTrackPublication] =
    useState<LocalAudioTrackPublication>(null);

  const toggleVideoTrack = () => {
    if (localVideoTrackPublication) {
      localVideoTrackPublication.track.stop();
      localVideoTrackPublication.unpublish();
      setLocalVideoTrackPublication(null);
      return;
    }
    createLocalVideoTrack()
      .then((localVideoTrack) => {
        return room?.localParticipant?.publishTrack(localVideoTrack);
      })
      .then((publication) => {
        setLocalVideoTrackPublication(
          publication as LocalVideoTrackPublication
        );
        console.log("Successfully unmuted your video:", publication.track);
      });
  };

  const toggleAudioTrack = () => {
    let newTrack: LocalAudioTrack | null = null;
    if (localAudioTrackPublication.track.isEnabled) {
      newTrack = localAudioTrackPublication.track.disable();
    } else {
      newTrack = localAudioTrackPublication.track.enable();
    }
    setLocalAudioTrackPublication(
      (publication) =>
        ({
          ...publication,
          track: newTrack,
        } as LocalAudioTrackPublication)
    );
  };

  useEffect(() => {
    setLocalVideoTrackPublication(
      Array.from(room?.localParticipant?.tracks?.values?.() ?? []).find(
        (track) => track?.kind === "video"
      ) as LocalVideoTrackPublication
    );
    setLocalAudioTrackPublication(
      Array.from(room?.localParticipant?.tracks?.values?.() ?? []).find(
        (track) => track?.kind === "audio"
      ) as LocalAudioTrackPublication
    );
  }, [room]);

  return {
    localVideoTrackPublication,
    localAudioTrackPublication,
    toggleVideoTrack,
    toggleAudioTrack,
  };
};

export { useLocalTracks };
