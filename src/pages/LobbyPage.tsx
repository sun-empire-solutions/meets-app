import React, { useContext, useEffect, useRef, useState } from "react";
import {
  createLocalTracks,
  createLocalVideoTrack,
  LocalAudioTrack,
  LocalVideoTrack,
} from "twilio-video";

import { LobbyButtons } from "../components/LobbyButtons";
import { TwilioContext } from "../context/TwilioContext";

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

  const saveVideoTrack = (vTrack) => {
    setVideoTrack((prev) => {
      cleanPrevVideoTrack(prev, videoRef);
      return vTrack;
    });
  };

  useEffect(() => {
    const videoSettings = getVideoSettings();
    const audioSettings = getAudioSettings();

    createLocalTracks({
      audio: audioSettings,
      video: videoSettings ? { facingMode: "user" } : false,
    }).then((tracks) => {
      const vTrack = tracks.find(findVideoTrack) as LocalVideoTrack;
      const aTrack = tracks.find(findAudioTrack) as LocalAudioTrack;
      vTrack?.attach(videoRef.current);
      saveVideoTrack(vTrack);
      saveVideoSettings(vTrack?.isEnabled ?? false);
      saveAudioSettings(aTrack?.isEnabled ?? false);
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
    videoTrack?.stop();
    videoTrack?.detach(videoRef.current);
    setVideoTrack(null);
  }, [isVideoEnabled]);

  return (
    <div className="container">
      <video
        ref={videoRef}
        id="localVideo"
        src=""
        width={400}
        height={200}
      ></video>
      <LobbyButtons />
    </div>
  );
};

const findAudioTrack = (track) => track.kind === "audio";

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
