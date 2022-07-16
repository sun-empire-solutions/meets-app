import { IoMdReverseCamera } from "react-icons/io";

import { useCameraSwitch } from "../hooks";

const CameraSwitcher = () => {
  const { switchCamera } = useCameraSwitch();

  return (
    <div className="camera-switcher" role="button" onClick={switchCamera}>
      <IoMdReverseCamera size={24} color="#fff" />
    </div>
  );
};

export { CameraSwitcher };
