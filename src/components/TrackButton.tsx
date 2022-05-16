import { BsCameraVideoOff } from "react-icons/bs";
import { BsCameraVideo } from "react-icons/bs";
import { BsMic } from "react-icons/bs";
import { BsMicMute } from "react-icons/bs";

const TrackButton = ({ type, isActive, handlerClick }: IProps) => {
  if (type == "camara") {
    return (
      <button className="button" onClick={handlerClick}>
        {isActive ? (
          <BsCameraVideo size={18} />
        ) : (
          <BsCameraVideoOff size={18} />
        )}
      </button>
    );
  }
  return (
    <button className="button" onClick={handlerClick}>
      {isActive ? <BsMic size={18} /> : <BsMicMute size={18} />}
    </button>
  );
};

type IProps = {
  type: IType;
  isActive: boolean;
  handlerClick: () => void;
};

export type IType = "microfono" | "camara";

export { TrackButton };
