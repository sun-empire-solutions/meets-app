import { useContext, useEffect, useRef, useState } from "react";
import {
  LocalVideoTrack,
  RemoteAudioTrack,
  RemoteAudioTrackPublication,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  RemoteVideoTrack,
  RemoteVideoTrackPublication,
  VideoTrackPublication,
} from "twilio-video";
import { BsMicMuteFill } from "react-icons/bs";

import { TwilioContext } from "../context/TwilioContext";
import { useClassNames } from "../hooks/useClassNames";
import { ParticipantAvatar } from "./ParticipantAvatar";

const Participant = ({ participant, index }: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioTrackPublication, setAudioTrackPublication] =
    useState<RemoteAudioTrackPublication>(null);
  const [videoTrackPublication, setVideoTrackPublication] =
    useState<RemoteVideoTrackPublication>(null);
  const [isMuted, setIsMuted] = useState(false);
  const {
    room,
    localVideoTrackPublication,
    isFrontCameraEnabled,
    isSwitchingCamera,
  } = useContext(TwilioContext);
  const [isVideoEnabled, setIsVideoEnabled] = useState(
    localVideoTrackPublication?.track?.isEnabled
  );
  const classNames = useClassNames();

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
    publication: VideoTrackPublication
  ) => {
    publication.on("unsubscribed", () => {
      publication.track?.detach(videoRef.current);
      setIsVideoEnabled(false);
    });
  };

  const handleVideoPublicationEnabled = (
    publication: VideoTrackPublication
  ) => {
    publication.on("subscribed", () => {
      publication.track.attach(videoRef.current);
      setIsVideoEnabled(true);
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
        setIsVideoEnabled(true);
        handleVideoPublicationDisabled(videoTrackPublication);
        handleVideoPublicationEnabled(videoTrackPublication);
      }

      videoTrackPublication.on("subscribed", (track) => {
        track?.attach(videoRef.current);
        setIsVideoEnabled(true);
        handleVideoPublicationDisabled(videoTrackPublication);
        handleVideoPublicationEnabled(videoTrackPublication);
      });
      return;
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

  useEffect(() => {
    if (room?.localParticipant.identity === participant.identity) {
      if (localVideoTrackPublication) {
        const { track } = localVideoTrackPublication;
        (track as LocalVideoTrack)?.attach(videoRef.current);
        handleVideoPublicationDisabled(localVideoTrackPublication);
        handleVideoPublicationEnabled(localVideoTrackPublication);
        setIsVideoEnabled(true);
        return;
      }
      setIsVideoEnabled(false);
    }
  }, [localVideoTrackPublication]);

  return (
    <div hidden className={`participant-wrapper participant-${index}`}>
      {!isVideoEnabled && !isSwitchingCamera && (
        <ParticipantAvatar
          isLocal={room?.localParticipant.identity === participant.identity}
        />
      )}
      <video
        ref={videoRef}
        className={classNames({
          hidden: !isVideoEnabled,
          "is-front": isFrontCameraEnabled,
        })}
      >
        {participant.identity}
      </video>
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
