import { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FiLink2 } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useMeetingCode } from "../../join-page/hooks/use-meeting-code";
import { IMeeting } from "../hooks/use-meetings";

const MeetingLinkItem = ({ meeting }: IProps) => {
  const navigate = useNavigate();
  const { saveMeetingCode } = useMeetingCode();
  const { code, timestamp } = meeting;
  const [isCopied, setIsCopied] = useState(false);
  const [timePassed, setTimePassed] = useState(
    getTimePassed(new Date(timestamp))
  );

  const copyCodeToClipboard = () => {
    if (!isCopied) {
      navigator.clipboard.writeText(`${window.location.origin}/join/${code}`);
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
    setInterval(() => {
      setTimePassed(getTimePassed(new Date(timestamp)));
    }, 500);
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
          <div className="meeting-content_time">{`Link created ${timePassed}`}</div>
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

const getTimePassed = (date: Date): string => {
  const now = new Date();
  const timePassed = now.getTime() - date.getTime();
  const seconds = Math.floor(timePassed / 1000);
  if (seconds < 30) return "just now";
  if (seconds < 60) return "a few seconds ago";
  if (seconds < 120) return "a min ago";
  return `${Math.floor(seconds / 60)} mins ago`;
};

type IProps = {
  meeting: IMeeting;
};

export { MeetingLinkItem };
