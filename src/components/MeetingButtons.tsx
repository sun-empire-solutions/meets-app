import { useContext } from "react";
import { MdCallEnd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { TrackButtons } from "../components/TrackButtons";
import { Button } from "../components/Button";
import { TwilioContext } from "../context/TwilioContext";

const MeetingButtons = () => {
  const { room } = useContext(TwilioContext);
  const navigate = useNavigate();

  const handleLeave = () => {
    room.disconnect();
    navigate("/lobby");
  };

  return (
    <div className="meeting-buttons">
      <Button
        classNames="leave-button"
        icon={<MdCallEnd size={28} />}
        onClick={handleLeave}
      />
      <TrackButtons />
    </div>
  );
};
export { MeetingButtons };
