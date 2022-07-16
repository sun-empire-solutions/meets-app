import { useState } from "react";

import { useTwilioContext } from "../../../context";

const useCameraSwitch = () => {
  const { videoTrack } = useTwilioContext();
  const [isFrontCameraActive, setIsFrontCameraActive] = useState(true);

  const switchCamera = () => {
    videoTrack.restart({
      facingMode: isFrontCameraActive ? { exact: "environment" } : "user",
    });
    setIsFrontCameraActive((active) => !active);
  };

  return { switchCamera };
};

export { useCameraSwitch };
