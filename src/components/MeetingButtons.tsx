import { useEffect, useState } from "react";
import { MdCallEnd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useTwilioContext } from "../context";
import { useMeetingCode, useParticipants } from "../hooks";

import { Button } from "./Button";
import { TrackButtons } from "./TrackButtons";
import { AiOutlineArrowUp } from "react-icons/ai";
import { Twilio } from "twilio";
import { createLocalTracks, createLocalVideoTrack, LocalVideoTrack, LocalParticipant } from "twilio-video";

const MeetingButtons = () => {
  const { room, removeLocalAudioAndVideoTracks } = useTwilioContext();
  const participants = useParticipants();
  const navigate = useNavigate();
  const [shareOwnScreen, setOwnShareScreen] = useState(false)
  const { removeMeetingCode } = useMeetingCode();

  const handleLeave = () => {
    removeLocalAudioAndVideoTracks();
    removeMeetingCode();
    room.disconnect();
  };

  const shareScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({video: {frameRate: 15}});
      const screenTrack = new LocalVideoTrack(stream.getTracks()[0],{name:'screen-share'});
      console.log('screenTrack',screenTrack)
      console.log(`Participants before`, participants);
      const published = await room.localParticipant.publishTrack(screenTrack);
      setOwnShareScreen(true)
    } catch (error) {
      console.error('Screen share error',error);
      alert('Couldn\'t share the screen');
    }
    
  }

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
      <Button
        classNames="screen-share-button"
        icon={<AiOutlineArrowUp />}
        onClick={() => shareScreen()}
      />
      <TrackButtons />
    </div>
  );
};
export { MeetingButtons };
