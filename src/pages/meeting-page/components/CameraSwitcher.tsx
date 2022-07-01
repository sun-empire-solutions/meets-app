import { useContext } from "react";
import { IoMdReverseCamera } from "react-icons/io";

import { TwilioContext } from "../../../context/TwilioContext";

const CameraSwitcher = () => {
  const { switchCamera } = useContext(TwilioContext);

  return (
    <div className="camera-switcher" role="button" onClick={switchCamera}>
      <IoMdReverseCamera size={24} color="#fff" />
    </div>
  );
};

export { CameraSwitcher };
