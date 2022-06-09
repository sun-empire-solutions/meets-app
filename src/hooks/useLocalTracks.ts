import { useEffect, useState } from "react";
import {
  createLocalVideoTrack,
  LocalAudioTrack,
  LocalAudioTrackPublication,
  LocalVideoTrackPublication,
  Room,
} from "twilio-video";

import { TrackSettings } from "./useTracksSettings";

const useLocalTracks = (room: Room, tracksSettings: TrackSettings) => {
  const [localVideoTrackPublication, setLocalVideoTrackPublication] =
    useState<LocalVideoTrackPublication>(null);
  const [localAudioTrackPublication, setLocalAudioTrackPublication] =
    useState<LocalAudioTrackPublication>(null);
  const {
    isAudioEnabled,
    isVideoEnabled,
    saveVideoSettings,
    saveAudioSettings,
  } = tracksSettings;

  const toggleVideoTrack = () => {
    if (localVideoTrackPublication || isVideoEnabled) {
      localVideoTrackPublication?.track?.stop();
      localVideoTrackPublication?.unpublish();
      setLocalVideoTrackPublication(null);
      saveVideoSettings(false);
      return;
    }

    if (room) {
      createLocalVideoTrack()
        .then((localVideoTrack) => {
          return room?.localParticipant?.publishTrack(localVideoTrack);
        })
        .then((publication) => {
          setLocalVideoTrackPublication(
            publication as LocalVideoTrackPublication
          );
        });
    }
    saveVideoSettings(true);
  };

  const toggleAudioTrack = () => {
    let newTrack: LocalAudioTrack | null = null;
    if (localAudioTrackPublication?.track?.isEnabled || isAudioEnabled) {
      newTrack = localAudioTrackPublication?.track?.disable();
      saveAudioSettings(false);
    } else {
      newTrack = localAudioTrackPublication?.track?.enable();
      saveAudioSettings(true);
    }
    setLocalAudioTrackPublication(
      (publication) =>
        ({
          ...publication,
          track: newTrack,
        } as LocalAudioTrackPublication)
    );
  };

  const clearTracks = () => {
    localVideoTrackPublication?.track?.stop();
    localVideoTrackPublication?.unpublish();
    setLocalVideoTrackPublication(null);
    localAudioTrackPublication?.track?.disable();
    setLocalAudioTrackPublication(null);
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
    clearTracks,
  };
};

export { useLocalTracks };
