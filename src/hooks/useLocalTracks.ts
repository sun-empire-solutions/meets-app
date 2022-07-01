import { useEffect, useMemo, useState } from "react";
import {
  createLocalAudioTrack,
  createLocalVideoTrack,
  LocalAudioTrack,
  LocalAudioTrackPublication,
  LocalVideoTrackPublication,
  Room,
} from "twilio-video";

import { TrackSettings } from "./useTracksSettings";

const useLocalTracks = (
  room: Room,
  tracksSettings: TrackSettings
): LocalTracksTypes => {
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
  const [videoMediaDevices, setVideoMediaDevices] = useState([]);
  const [isFrontCameraEnabled, setIsFrontCameraEnabled] = useState(true);
  const hasMultipleVideoInputs = useMemo(
    () => videoMediaDevices.length > 1,
    [videoMediaDevices]
  );

  const toggleVideoTrack = () => {
    if (localVideoTrackPublication || isVideoEnabled) {
      localVideoTrackPublication?.track?.stop();
      localVideoTrackPublication?.unpublish();
      setLocalVideoTrackPublication(null);
      saveVideoSettings(false);
      return;
    }

    if (room) {
      createLocalVideoTrack({
        facingMode: isFrontCameraEnabled ? "user" : { exact: "environment" },
      })
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
    if (!localAudioTrackPublication) {
      createLocalAudioTrack()
        .then((localAudioTrack) => {
          return room?.localParticipant?.publishTrack(localAudioTrack);
        })
        .then((publication) => {
          setLocalAudioTrackPublication(
            publication as LocalAudioTrackPublication
          );
        });
      saveAudioSettings(!isAudioEnabled);
      return;
    }
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

  const switchCamera = () => {
    if (localVideoTrackPublication) {
      localVideoTrackPublication?.track?.stop();
      localVideoTrackPublication?.unpublish();
      setLocalVideoTrackPublication(null);

      createLocalVideoTrack({
        facingMode: isFrontCameraEnabled ? { exact: "environment" } : "user",
      })
        .then((localVideoTrack) => {
          return room?.localParticipant?.publishTrack(localVideoTrack);
        })
        .then((publication) => {
          setLocalVideoTrackPublication(
            publication as LocalVideoTrackPublication
          );
          setIsFrontCameraEnabled((enabled) => !enabled);
        });
    }
  };

  const setVideoInputDevices = () => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setVideoMediaDevices(devices.filter((d) => d.kind === "videoinput"));
    });
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
    switchCamera,
    isFrontCameraEnabled,
    hasMultipleVideoInputs,
    setVideoInputDevices,
  };
};

export type LocalTracksTypes = {
  localVideoTrackPublication: LocalVideoTrackPublication;
  localAudioTrackPublication: LocalAudioTrackPublication;
  toggleVideoTrack: () => void;
  toggleAudioTrack: () => void;
  clearTracks: () => void;
  switchCamera: () => void;
  isFrontCameraEnabled: boolean;
  hasMultipleVideoInputs: boolean;
  setVideoInputDevices: () => void;
};

export { useLocalTracks };
