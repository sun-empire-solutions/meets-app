import { MdCallEnd } from "react-icons/md";

import { TrackButtons } from "../components/TrackButtons";
import { Button } from "../components/Button";

const MeetingButtons = () => {
  return (
    <div className="meeting-buttons">
      <Button
        classNames="leave-button"
        icon={<MdCallEnd size={28} />}
        onClick={() => {}}
      />
      <TrackButtons />
    </div>
  );
};
export { MeetingButtons };
