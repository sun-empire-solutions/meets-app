import { useRef, useEffect } from "react";
import { Track } from "twilio-video";

import { useMediaStreamTrack, useVideoTrackDimensions } from "../../hooks";
import { IVideoTrack } from "../../types";

const VideoTrack = ({ track, isLocal, priority }: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const mediaStreamTrack = useMediaStreamTrack(track);
  const dimensions = useVideoTrackDimensions(track);
  const isPortrait = (dimensions?.height ?? 0) > (dimensions?.width ?? 0);

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.muted = true;
    if (track.setPriority && priority) {
      track.setPriority(priority);
    }
    track.attach(videoElement);
    return () => {
      track.detach(videoElement);

      videoElement.srcObject = null;

      if (track.setPriority && priority) {
        track.setPriority(null);
      }
    };
  }, [track, priority]);

  const isFrontFacing =
    mediaStreamTrack?.getSettings().facingMode !== "environment";
  const style = {
    transform: isFrontFacing ? "scaleX(-1)" : "",
    objectFit:
      isPortrait || track.name.includes("screen")
        ? ("contain" as const)
        : ("cover" as const),
  };

  return <video ref={videoRef} style={style} />;
};

type IProps = {
  track: IVideoTrack;
  isLocal?: boolean;
  priority?: Track.Priority | null;
};

export { VideoTrack };
