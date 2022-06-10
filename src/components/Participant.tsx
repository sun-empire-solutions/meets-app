import { useEffect, useRef } from "react";
import { Participant as IParticipant, RemoteParticipant } from "twilio-video";

const Participant = ({ participant, index }: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  console.log("Participant", participant);

  useEffect(() => {
    const videoTrackPublications = Array.from(
      participant?.videoTracks?.values() ?? []
    );
    if (videoTrackPublications?.length) {
      const publication = videoTrackPublications[0];
      const videoTrack = publication?.track;
      videoTrack?.attach(videoRef.current);

      publication.on("subscribed", (track) => {
        track?.attach(videoRef.current);
      });
    }
  }, [participant]);

  return (
    <div className={`participant-wrapper participant-${index}`}>
      <video ref={videoRef}>{participant.identity}</video>
    </div>
  );
};

type IProps = {
  participant: RemoteParticipant;
  index: number;
};

export { Participant };
