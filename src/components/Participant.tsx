import { useContext, useEffect, useRef, useState } from "react";
import {
  RemoteAudioTrack,
  RemoteAudioTrackPublication,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  RemoteVideoTrack,
  RemoteVideoTrackPublication,
} from "twilio-video";
import { BsMicMuteFill } from "react-icons/bs";

import { TwilioContext } from "../context/TwilioContext";

const Participant = ({ participant, index }: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioTrackPublication, setAudioTrackPublication] =
    useState<RemoteAudioTrackPublication>(null);
  const [videoTrackPublication, setVideoTrackPublication] =
    useState<RemoteVideoTrackPublication>(null);
  const [isMuted, setIsMuted] = useState(false);
  const { room } = useContext(TwilioContext);

  const handleAudioTrackDisabled = (track: RemoteAudioTrack) => {
    track.on("disabled", () => {
      track.detach(audioRef.current);
      setIsMuted(true);
    });
  };

  const handleAudioTrackEnabled = (track: RemoteAudioTrack) => {
    track.on("enabled", () => {
      track.attach(audioRef.current);
      setIsMuted(false);
    });
  };

  const handleVideoPublicationDisabled = (
    publication: RemoteVideoTrackPublication
  ) => {
    publication.on("unsubscribed", () => {
      publication.track?.detach(videoRef.current);
    });
  };

  const handleVideoPublicationEnabled = (
    publication: RemoteVideoTrackPublication
  ) => {
    publication.on("subscribed", () => {
      publication.track.attach(videoRef.current);
    });
  };

  useEffect(() => {
    setIsMuted(!audioTrackPublication?.isTrackEnabled);
  }, [audioTrackPublication]);

  useEffect(() => {
    setVideoTrackPublication(() => {
      const videoTrackPublications = Array.from(
        participant?.videoTracks?.values() ?? []
      );
      return videoTrackPublications?.[0] ?? null;
    });

    setAudioTrackPublication(() => {
      const audioTrackPublications = Array.from(
        participant?.audioTracks?.values() ?? []
      );
      return audioTrackPublications?.[0] ?? null;
    });
  }, [participant]);

  useEffect(() => {
    if (audioTrackPublication) {
      const audioTrack = audioTrackPublication?.track;
      audioTrack?.attach(audioRef.current);

      if (audioTrackPublication.isSubscribed) {
        handleAudioTrackDisabled(audioTrackPublication.track);
        handleAudioTrackEnabled(audioTrackPublication.track);
      }

      audioTrackPublication.on("subscribed", (track) => {
        track?.attach(audioRef.current);
        handleAudioTrackDisabled(track);
        handleAudioTrackEnabled(track);
      });
    }
  }, [audioTrackPublication]);

  useEffect(() => {
    if (videoTrackPublication) {
      const videoTrack = videoTrackPublication?.track;
      videoTrack?.attach(videoRef.current);

      if (videoTrackPublication.isSubscribed) {
        handleVideoPublicationDisabled(videoTrackPublication);
        handleVideoPublicationEnabled(videoTrackPublication);
      }

      videoTrackPublication.on("subscribed", (track) => {
        track?.attach(videoRef.current);
        handleVideoPublicationDisabled(videoTrackPublication);
        handleVideoPublicationEnabled(videoTrackPublication);
      });
    }
  }, [videoTrackPublication]);

  useEffect(() => {
    room?.on(
      "trackSubscribed",
      (
        track: RemoteTrack,
        publication: RemoteTrackPublication,
        trackParticipant: RemoteParticipant
      ) => {
        console.log("trackSubscribed", track, publication, trackParticipant);

        if (trackParticipant.identity === participant.identity) {
          if (publication.kind === "audio") {
            setAudioTrackPublication(
              publication as RemoteAudioTrackPublication
            );
            const { track } = publication;
            (track as RemoteAudioTrack)?.attach(audioRef.current);
            handleAudioTrackDisabled(track as RemoteAudioTrack);
            handleAudioTrackEnabled(track as RemoteAudioTrack);
          } else if (publication.kind === "video") {
            setVideoTrackPublication(
              publication as RemoteVideoTrackPublication
            );
            const { track } = publication;
            (track as RemoteVideoTrack)?.attach(videoRef.current);
            handleVideoPublicationDisabled(
              publication as RemoteVideoTrackPublication
            );
            handleVideoPublicationEnabled(
              publication as RemoteVideoTrackPublication
            );
          }
        }
      }
    );
  }, [room]);

  return (
    <div className={`participant-wrapper participant-${index}`}>
      <video ref={videoRef}>{participant.identity}</video>
      <audio ref={audioRef} autoPlay></audio>
      {isMuted && room?.localParticipant.identity !== participant.identity && (
        <div className="muted-indicator">
          <BsMicMuteFill size={16} color="white" />
        </div>
      )}
    </div>
  );
};

type IProps = {
  participant: RemoteParticipant;
  index: number;
};

export { Participant };
