import { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FiLink2 } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";

const MeetingLinkItem = ({ code }: IProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyCodeToClipboard = () => {
    if (!isCopied) {
      navigator.clipboard.writeText(`${code}`);
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  return (
    <div key={code} className="meeting-item">
      <div className="meeting-item_left">
        <div className="link-icon">
          <FiLink2 />
        </div>
        <div className="meeting-content">{code}</div>
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

type IProps = {
  code: string;
};

export { MeetingLinkItem };
