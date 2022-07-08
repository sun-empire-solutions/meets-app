import { useEffect, useRef } from "react";
import { AudioTrack as IAudioTrack } from "twilio-video";

const AudioTrack = ({ track }: IProps) => {
  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    track.attach(audioRef.current);
    return () =>
      track.detach(audioRef.current).forEach((el) => {
        el.remove();
        el.srcObject = null;
      });
  }, [track]);

  return <audio ref={audioRef} autoPlay></audio>;
};

type IProps = {
  track: IAudioTrack;
};

export { AudioTrack };
