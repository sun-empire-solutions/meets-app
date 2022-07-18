import { useEffect, useRef } from "react";
import { AudioTrack as IAudioTrack } from "twilio-video";

const AudioTrack = ({ track }: IProps) => {
  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    track?.attach(audioRef.current);
    return () => {
      if (audioRef.current) {
        track?.detach(audioRef.current);
      }
    };
  }, [track, audioRef.current]);

  return <audio ref={audioRef} autoPlay></audio>;
};

type IProps = {
  track: IAudioTrack;
};

export { AudioTrack };
