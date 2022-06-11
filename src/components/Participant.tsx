import { useEffect, useRef } from "react";
import { RemoteParticipant } from "twilio-video";

const Participant = ({ participant, index }: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const videoTrackPublications = Array.from(
      participant?.videoTracks?.values() ?? []
    );
    if (videoTrackPublications?.length) {
      const videoPublication = videoTrackPublications[0];
      const videoTrack = videoPublication?.track;
      videoTrack?.attach(videoRef.current);

      videoPublication.on("subscribed", (track) => {
        track?.attach(videoRef.current);
      });
    }

    const audioTrackPublications = Array.from(
      participant?.audioTracks?.values() ?? []
    );
    if (audioTrackPublications?.length) {
      const audioPublication = audioTrackPublications[0];
      const audioTrack = audioPublication?.track;
      audioTrack?.attach(videoRef.current);

      audioPublication.on("subscribed", (track) => {
        track?.attach(audioRef.current);
      });
    }
  }, [participant]);

  return (
    <div className={`participant-wrapper participant-${index}`}>
      <video ref={videoRef}>{participant.identity}</video>
      <audio ref={audioRef} autoPlay></audio>
    </div>
  );
};

type IProps = {
  participant: RemoteParticipant;
  index: number;
};

export { Participant };
