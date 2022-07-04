import { IoMdReverseCamera } from "react-icons/io";

import { useTwilioContext } from "../../../context";

const CameraSwitcher = () => {
  const { switchCamera } = useTwilioContext();

  return (
    <div className="camera-switcher" role="button" onClick={switchCamera}>
      <IoMdReverseCamera size={24} color="#fff" />
    </div>
  );
};

export { CameraSwitcher };
