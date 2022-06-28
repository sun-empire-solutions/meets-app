import React, { useContext, useEffect, useRef, useState } from "react";
import {
  createLocalTracks,
  createLocalVideoTrack,
  LocalVideoTrack,
} from "twilio-video";

import { LobbyButtons } from "../components/LobbyButtons";
import { TwilioContext } from "../context/TwilioContext";
import { useClassNames } from "../hooks/useClassNames";
import { ParticipantAvatar } from "../components/ParticipantAvatar";

const LobbyPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    isVideoEnabled,
    saveAudioSettings,
    saveVideoSettings,
    getAudioSettings,
    getVideoSettings,
  } = useContext(TwilioContext);
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
      {!isVideoEnabled && <ParticipantAvatar isLocal />}
      <video
        className={classNames({ hidden: !videoTrack })}
        ref={videoRef}
        id="localVideo"
        width={400}
        height={200}
      ></video>
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
