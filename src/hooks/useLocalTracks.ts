import { useCallback, useState } from "react";
import Twilio, {
  LocalVideoTrack,
  LocalAudioTrack,
  CreateLocalTrackOptions,
} from "twilio-video";

import {
  DEFAULT_VIDEO_CONSTRAINTS,
  SELECTED_AUDIO_INPUT_KEY,
  SELECTED_VIDEO_INPUT_KEY,
} from "../constants";
import { getDeviceInfo, isPermissionDenied } from "../utils";
import { useTracksSettings } from "./useTracksSettings";

const useLocalTracks = () => {
  const [audioTrack, setAudioTrack] = useState<LocalAudioTrack>();
  const [videoTrack, setVideoTrack] = useState<LocalVideoTrack>();
  const [isAcquiringLocalTracks, setIsAcquiringLocalTracks] = useState(false);
  const { getAudioSettings, getVideoSettings } = useTracksSettings();
  const isAudioEnabled = getAudioSettings();
  const isVideoEnabled = getVideoSettings();

  const getLocalAudioTrack = useCallback((deviceId?: string) => {
    const options: CreateLocalTrackOptions = {};

    if (deviceId) {
      options.deviceId = { exact: deviceId };
    }
    removeLocalAudioTrack();
    return Twilio.createLocalAudioTrack(options).then((newTrack) => {
      setAudioTrack(newTrack);
      return newTrack;
    });
  }, []);

  const getLocalVideoTrack = useCallback(async () => {
    const selectedVideoDeviceId = window.localStorage.getItem(
      SELECTED_VIDEO_INPUT_KEY
    );

    const { videoInputDevices } = await getDeviceInfo();

    const hasSelectedVideoDevice = videoInputDevices.some(
      (device) =>
        selectedVideoDeviceId && device.deviceId === selectedVideoDeviceId
    );

    const options: CreateLocalTrackOptions = {
      ...(DEFAULT_VIDEO_CONSTRAINTS as {}),
      name: `camera-${Date.now()}`,
      ...(hasSelectedVideoDevice && {
        deviceId: { exact: selectedVideoDeviceId! },
      }),
    };

    removeLocalVideoTrack();
    return Twilio.createLocalVideoTrack(options).then((newTrack) => {
      setVideoTrack(newTrack);
      return newTrack;
    });
  }, []);

  const removeLocalAudioTrack = useCallback(() => {
    if (audioTrack) {
      audioTrack.stop();
      setAudioTrack(undefined);
    }
  }, [audioTrack]);

  const removeLocalVideoTrack = useCallback(() => {
    if (videoTrack) {
      videoTrack.stop();
      setVideoTrack(undefined);
    }
  }, [videoTrack]);

  const getAudioAndVideoTracks = useCallback(async () => {
    const {
      audioInputDevices,
      videoInputDevices,
      hasAudioInputDevices,
      hasVideoInputDevices,
    } = await getDeviceInfo();

    if (!hasAudioInputDevices && !hasVideoInputDevices)
      return Promise.resolve();
    if (isAcquiringLocalTracks || audioTrack || videoTrack)
      return Promise.resolve();

    setIsAcquiringLocalTracks(true);

    const selectedAudioDeviceId = window.localStorage.getItem(
      SELECTED_AUDIO_INPUT_KEY
    );
    const selectedVideoDeviceId = window.localStorage.getItem(
      SELECTED_VIDEO_INPUT_KEY
    );

    const hasSelectedAudioDevice = audioInputDevices.some(
      (device) =>
        selectedAudioDeviceId && device.deviceId === selectedAudioDeviceId
    );
    const hasSelectedVideoDevice = videoInputDevices.some(
      (device) =>
        selectedVideoDeviceId && device.deviceId === selectedVideoDeviceId
    );

    // In Chrome, it is possible to deny permissions to only audio or only video.
    // If that has happened, then we don't want to attempt to acquire the device.
    const isCameraPermissionDenied = await isPermissionDenied("camera" as any);
    const isMicrophonePermissionDenied = await isPermissionDenied(
      "microphone" as any
    );

    const shouldAcquireVideo =
      isVideoEnabled && hasVideoInputDevices && !isCameraPermissionDenied;
    const shouldAcquireAudio =
      isAudioEnabled && hasAudioInputDevices && !isMicrophonePermissionDenied;
    console.log(shouldAcquireAudio, shouldAcquireVideo);

    const localTrackConstraints = {
      video: shouldAcquireVideo && {
        ...(DEFAULT_VIDEO_CONSTRAINTS as {}),
        name: `camera-${Date.now()}`,
        ...(hasSelectedVideoDevice && {
          deviceId: { exact: selectedVideoDeviceId! },
        }),
      },
      audio:
        shouldAcquireAudio &&
        (hasSelectedAudioDevice
          ? { deviceId: { exact: selectedAudioDeviceId! } }
          : hasAudioInputDevices),
    };

    return Twilio.createLocalTracks(localTrackConstraints)
      .then((tracks) => {
        const newVideoTrack = tracks.find(
          (track) => track.kind === "video"
        ) as LocalVideoTrack;
        const newAudioTrack = tracks.find(
          (track) => track.kind === "audio"
        ) as LocalAudioTrack;
        if (newVideoTrack) {
          setVideoTrack(newVideoTrack);
          // Save the deviceId so it can be picked up by the VideoInputList component. This only matters
          // in cases where the user's video is disabled.
          window.localStorage.setItem(
            SELECTED_VIDEO_INPUT_KEY,
            newVideoTrack.mediaStreamTrack.getSettings().deviceId ?? ""
          );
        }
        if (newAudioTrack) {
          setAudioTrack(newAudioTrack);
        }

        // These custom errors will be picked up by the MediaErrorSnackbar component.
        if (isCameraPermissionDenied && isMicrophonePermissionDenied) {
          const error = new Error();
          error.name = "NotAllowedError";
          throw error;
        }

        if (isCameraPermissionDenied) {
          throw new Error("CameraPermissionsDenied");
        }

        if (isMicrophonePermissionDenied) {
          throw new Error("MicrophonePermissionsDenied");
        }
      })
      .finally(() => setIsAcquiringLocalTracks(false));
  }, [audioTrack, videoTrack, isAcquiringLocalTracks]);

  const removeLocalAudioAndVideoTracks = useCallback(() => {
    removeLocalAudioTrack();
    removeLocalVideoTrack();
  }, []);

  const localTracks = [audioTrack, videoTrack].filter(
    (track) => track !== undefined
  ) as (LocalAudioTrack | LocalVideoTrack)[];

  return {
    videoTrack,
    audioTrack,
    localTracks,
    getLocalVideoTrack,
    getLocalAudioTrack,
    isAcquiringLocalTracks,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
    getAudioAndVideoTracks,
    removeLocalAudioAndVideoTracks,
  };
};

export { useLocalTracks };
