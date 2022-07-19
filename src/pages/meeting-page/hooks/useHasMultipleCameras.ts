import { useEffect, useState } from "react";

const useHasMultipleCameras = () => {
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setHasMultipleCameras(
        devices.filter((d) => d.kind === "videoinput").length > 1
      );
    });
  }, []);

  return { hasMultipleCameras };
};

export { useHasMultipleCameras };
