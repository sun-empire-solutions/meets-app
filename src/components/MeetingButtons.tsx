import { TrackButtons } from "../components/TrackButtons";
import { Button } from "../components/Button";
import { MdCallEnd } from "react-icons/md";

const MeetingButtons = () => {
  const HandelClick = () => {
    console.log("clicked");
  };

  return (
    <div className="bar-buttons">
      <Button
        classNames="callend-button"
        icon={<MdCallEnd size={35} />}
        onClick={HandelClick}
      />
      <TrackButtons />
    </div>
  );
};
export { MeetingButtons };
