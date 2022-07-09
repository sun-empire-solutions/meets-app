import { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FiLink2 } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useMeetingCode } from "../../../hooks";
import { MEETING_AVAILABLE_MINUTES } from "../../../constants";
import { IMeeting } from "../../../types";

const MeetingLinkItem = ({ meeting, removeMeeting }: IProps) => {
  const navigate = useNavigate();
  const { saveMeetingCode } = useMeetingCode();
  const { code, timestamp } = meeting;
  const [isCopied, setIsCopied] = useState(false);
  const [timeLabel, setTimeLabel] = useState(
    getTimeLabel(getSecondsPassed(new Date(timestamp)))
  );

  const copyCodeToClipboard = () => {
    if (!isCopied) {
      navigator.clipboard.writeText(code);
      setIsCopied(true);
    }
  };

  const saveCodeAndNavigateToLobby = () => {
    saveMeetingCode(code);
    navigate("/lobby");
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLabel(getTimeLabel(getSecondsPassed(new Date(timestamp))));
      if (isMeetingOutOfRange(meeting)) {
        removeMeeting(meeting);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div key={code} className="meeting-item">
      <div
        className="meeting-item_left"
        role="button"
        onClick={saveCodeAndNavigateToLobby}
      >
        <div className="link-icon">
          <FiLink2 />
        </div>
        <div className="meeting-content">
          <div className="meeting-content_code">{code}</div>
          <div className="meeting-content_time">{`Link created ${timeLabel}`}</div>
        </div>
      </div>
      <div className="meeting-item_right">
        {isCopied ? (
          <div className="copied-message">
            <span className="copied-message_text">Copied!</span>
            <BsCheckLg size={18} />
          </div>
        ) : (
          <MdContentCopy size={22} onClick={copyCodeToClipboard} />
        )}
      </div>
    </div>
  );
};

const getSecondsPassed = (date: Date) => {
  const now = new Date();
  const timePassed = now.getTime() - date.getTime();
  return Math.floor(timePassed / 1000);
};

const getTimeLabel = (seconds: number) => {
  if (seconds < 30) return "just now";
  if (seconds < 60) return "a few seconds ago";
  if (seconds < 120) return "a min ago";
  return `${Math.floor(seconds / 60)} mins ago`;
};

const isMeetingOutOfRange = ({ timestamp }: IMeeting) => {
  const now = new Date();
  const timePassed = now.getTime() - new Date(timestamp).getTime();
  return timePassed > 1000 * 60 * MEETING_AVAILABLE_MINUTES;
};

type IProps = {
  meeting: IMeeting;
  removeMeeting: ({ code }: IMeeting) => void;
};

export { MeetingLinkItem };
