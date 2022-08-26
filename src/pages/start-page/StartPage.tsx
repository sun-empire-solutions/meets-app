import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMeetingCode } from "@/hooks";
import { Button, Input, Modal } from "@/components";

import { useMeetings } from "./hooks";
import { MeetingList, StartButtons } from "./components";

import linkImageSrc from "./../../assets/images/meeting-link.png";

const StartPage = () => {
  const { meetings, createNewMeeting, removeMeeting, isLoading } =
    useMeetings();
  const haveMeetings = useMemo(() => meetings.length > 0, [meetings]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetingName, setMeetingName] = useState("");
  const [showError, setShowError] = useState(false);
  const { saveMeetingCode } = useMeetingCode();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      inputRef.current?.focus();
    }
  }, [inputRef, isModalOpen]);

  if (isLoading) {
    return null;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setShowError(false);
    setIsModalOpen(false);
  };

  const joinMeeting = () => {
    if (isMeetingCodeValid(meetingName)) {
      setShowError(false);
      saveMeetingCode(meetingName);
      navigate("/lobby");
    }
    setShowError(true);
  };

  const joinMeetingEnterKey = (event) => {
    if (event.code === "Enter") {
      joinMeeting();
    }
  };

  return (
    <div className="start-page" onKeyDown={joinMeetingEnterKey}>
      <Modal
        isOpen={isModalOpen}
        title="Join with a code"
        body={
          <div className="start-page__modal-body">
            <Input
              classNames="code-input"
              ref={inputRef}
              placeholder="Ej: abc-mno-xyz"
              value={meetingName}
              mask="***-***-***"
              onChange={(evt) => {
                const meetingCode = evt.target.value;
                setMeetingName(meetingCode);
                if (isMeetingCodeValid(meetingCode)) {
                  setShowError(false);
                }
              }}
            />
            {showError && <div className="error-message">Invalid code</div>}
          </div>
        }
        footer={
          <Button
            classNames="join-code-button"
            onClick={joinMeeting}
            text="Join"
          />
        }
        onClose={closeModal}
      />
      <div className="left">
        <div className="welcome">Welcome!</div>
        <StartButtons
          createMeeting={createNewMeeting}
          joinMeetingWithCode={openModal}
        />
      </div>
      <div className="right">
        {haveMeetings ? (
          <MeetingList meetings={meetings} removeMeeting={removeMeeting} />
        ) : (
          <div className="info-message">
            <div className="info-message_image">
              <img src={linkImageSrc} alt="Link" />
            </div>
            <div className="info-message_title">Get a link you can share</div>
            <div className="info-message_subtitle">
              Tap <strong>New meeting</strong> to get a link you can send to
              people yo want to meet with
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const isMeetingCodeValid = (meetingCode: string) => {
  return new RegExp(/^\w{3}-\w{3}-\w{3}$/i).test(meetingCode);
};

export { StartPage };
