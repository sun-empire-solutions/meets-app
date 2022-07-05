import React, { useEffect, useRef, useState } from "react";
import {
  createLocalTracks,
  createLocalVideoTrack,
  LocalVideoTrack,
} from "twilio-video";

import { LobbyButtons, ParticipantAvatar } from "../../components";
import { useTwilioContext } from "../../context";
import { useClassNames } from "../../hooks/useClassNames";
import { LocalVideoPreview } from "./components/LocalVideoPreview";

const LobbyPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    isVideoEnabled,
    saveAudioSettings,
    saveVideoSettings,
    getAudioSettings,
    getVideoSettings,
  } = useTwilioContext();
  const [videoTrack, setVideoTrack] = useState<LocalVideoTrack | null>(null);
  const classNames = useClassNames();

  const saveVideoTrack = (vTrack) => {
    setVideoTrack((prev) => {
      cleanPrevVideoTrack(prev, videoRef);
      return vTrack;
    });
  };

  const clearVideoTrack = () => {
    videoTrack?.stop();
    videoTrack?.detach(videoRef.current);
  };

  useEffect(() => {
    const videoSettings = getVideoSettings();

    createLocalTracks({
      audio: false,
      video: videoSettings ? { facingMode: "user" } : false,
    }).then((tracks) => {
      const vTrack = tracks.find(findVideoTrack) as LocalVideoTrack;
      vTrack?.attach(videoRef.current);
      saveVideoTrack(vTrack);
      saveVideoSettings(vTrack?.isEnabled ?? false);
      saveAudioSettings(getAudioSettings());
    });
  }, []);

  useEffect(() => {
    if (isVideoEnabled) {
      createLocalVideoTrack({
        facingMode: "user",
      }).then((track) => {
        track?.attach(videoRef.current);
        saveVideoTrack(track);
        saveVideoSettings(true);
      });
      return;
    }
    clearVideoTrack();
    saveVideoTrack(null);
  }, [isVideoEnabled]);

  useEffect(() => {
    return () => {
      clearVideoTrack();
    };
  }, [videoTrack]);

  return (
    <div className="container">
      <LocalVideoPreview />
      <LobbyButtons />
    </div>
  );
};

const findVideoTrack = (track) => track.kind === "video";

const cleanPrevVideoTrack = (
  prev: LocalVideoTrack | null,
  videoRef: React.MutableRefObject<HTMLVideoElement>
) => {
  if (prev) {
    prev?.stop();
    prev?.detach(videoRef.current);
  }
};
export { LobbyPage };
