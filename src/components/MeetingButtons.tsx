import { useContext, useEffect } from "react";
import { MdCallEnd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { TrackButtons } from "../components/TrackButtons";
import { Button } from "../components/Button";
import { TwilioContext } from "../context/TwilioContext";
import { useMeetingCode } from "../pages/join-page/hooks/use-meeting-code";

const MeetingButtons = () => {
  const { room, clearTracks } = useContext(TwilioContext);
  const navigate = useNavigate();
  const { removeMeetingCode } = useMeetingCode();

  const handleLeave = () => {
    clearTracks();
    removeMeetingCode();
    room.disconnect();
  };

  useEffect(() => {
    room?.on("disconnected", () => {
      navigate("/start");
    });
  }, [room]);

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
