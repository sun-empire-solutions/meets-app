import { useContext, useEffect, useRef, useState } from "react";
import { createLocalTracks, LocalVideoTrack } from "twilio-video";

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
    clearTracks,
  } = useContext(TwilioContext);
  const [videoTrack, setVideoTrack] = useState<LocalVideoTrack | null>(null);

  useEffect(() => {
    const videoSettings = getVideoSettings();
    const audioSettings = getAudioSettings();

    console.log("LobbyPage: useEffect");

    createLocalTracks({
      audio: audioSettings,
      video: videoSettings ? { facingMode: "user" } : false,
    }).then((tracks) => {
      const vTrack = tracks.find(
        (track) => track.kind === "video"
      ) as LocalVideoTrack;
      const aTrack = tracks.find(
        (track) => track.kind === "audio"
      ) as LocalVideoTrack;
      vTrack?.attach(videoRef.current);
      setVideoTrack((prev) => {
        if (prev) {
          prev?.stop();
          prev?.detach(videoRef.current);
        }
        return vTrack;
      });
      saveVideoSettings(vTrack?.isEnabled ?? false);
      saveAudioSettings(aTrack?.isEnabled ?? false);
    });
  }, []);

  useEffect(() => {
    if (isVideoEnabled) {
      videoTrack?.stop();
      videoTrack?.detach(videoRef.current);
      setVideoTrack(null);
      console.log("Video enabled");

      const audioSettings = getAudioSettings();

      createLocalTracks({
        audio: audioSettings,
        video: { facingMode: "user" },
      }).then((tracks) => {
        const vTrack = tracks.find(
          (track) => track.kind === "video"
        ) as LocalVideoTrack;
        vTrack?.attach(videoRef.current);
        setVideoTrack((prev) => {
          if (prev) {
            prev?.stop();
            prev?.detach(videoRef.current);
          }
          return vTrack;
        });
      });
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

export { LobbyPage };
