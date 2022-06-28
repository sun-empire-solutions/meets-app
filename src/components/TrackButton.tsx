import {
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsMicFill,
  BsMicMuteFill,
} from "react-icons/bs";
import { IoMdReverseCamera } from "react-icons/io";

const TrackButton = ({ type, isActive, classNames = "", onClick }: IProps) => (
  <button
    className={`track-button ${!isActive ? "inactive" : ""} ${classNames}`}
    onClick={onClick}
  >
    {renderButtonIconByType(type, isActive)}
    <div className="button-background"></div>
  </button>
);

const renderButtonIconByType = (type: IType, isActive: boolean) => {
  const buttonsMap = {
    camera: isActive ? (
      <BsCameraVideoFill size={18} />
    ) : (
      <BsCameraVideoOffFill size={18} />
    ),
    mic: isActive ? <BsMicFill size={18} /> : <BsMicMuteFill size={18} />,
    switcher: <IoMdReverseCamera size={20} />,
  };

  return buttonsMap[type];
};

type IProps = {
  type: IType;
  isActive: boolean;
  classNames?: string;
  onClick: () => void;
};

export type IType = "mic" | "camera" | "switcher";

export { TrackButton };
