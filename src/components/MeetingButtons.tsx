import { useEffect } from "react";
import { MdCallEnd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useTwilioContext } from "@/context";
import { useMeetingCode } from "@/hooks";

import { Button } from "./Button";
import { TrackButtons } from "./TrackButtons";

const MeetingButtons = () => {
  const { room, removeLocalAudioAndVideoTracks } = useTwilioContext();
  const navigate = useNavigate();
  const { removeMeetingCode } = useMeetingCode();

  const handleLeave = () => {
    removeLocalAudioAndVideoTracks();
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
