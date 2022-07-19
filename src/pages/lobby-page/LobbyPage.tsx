import { useEffect, useMemo, useState } from "react";
import {
  MdContentCopy,
  MdOutlineInfo,
  MdOutlineIosShare,
} from "react-icons/md";
import { useWindowWidth } from "@react-hook/window-size";

import { LoadingIndicator, JoinButton, TrackButtons } from "../../components";
import { useTwilioContext } from "../../context";
import { useAuthUser, useMeetingCode, useTracksSettings } from "../../hooks";

import { LocalVideoPreview } from "./components/LocalVideoPreview";
import { BsCheckLg } from "react-icons/bs";

const LobbyPage = () => {
  const { getAudioAndVideoTracks, removeLocalAudioAndVideoTracks } =
    useTwilioContext();
  const { isAcquiringLocalTracks } = useTwilioContext();
  const { getVideoSettings } = useTracksSettings();
  const isVideoEnabled = getVideoSettings();
  const { meetingCode } = useMeetingCode();
  const { user } = useAuthUser();
  const width = useWindowWidth();
  const isMobile = useMemo(() => width < 768, [width]);
  const [isCopied, setIsCopied] = useState(false);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(meetingCode);
    setIsCopied(true);
  };

  const handleShare = () => {
    navigator.share({ text: meetingCode });
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  useEffect(() => {
    getAudioAndVideoTracks();

    return () => {
      removeLocalAudioAndVideoTracks();
    };
  }, []);

  if (isAcquiringLocalTracks && isVideoEnabled) {
    return <LoadingIndicator />;
  }

  return (
    <div className="lobby-page">
      <div className="lobby-page_top">
        <h3 className="title">{meetingCode}</h3>
      </div>
      <div className="lobby-video-preview">
        <LocalVideoPreview />
        <TrackButtons className="lobby-track-buttons" />
      </div>
      <div className="lobby-page_share-section">
        <div className="info-icon">
          <MdOutlineInfo size={20} />
        </div>
        <div className="share-code">{meetingCode}</div>
        {isMobile ? (
          <div className="share-icon" role="button" onClick={handleShare}>
            <MdOutlineIosShare size={24} />
          </div>
        ) : isCopied ? (
          <BsCheckLg color="#44dd44" size={18} />
        ) : (
          <MdContentCopy
            color="#aaaeb2"
            size={24}
            onClick={copyCodeToClipboard}
          />
        )}
      </div>
      <div className="lobby-page-bottom">
        <JoinButton />
        <span className="join-message">Joining as</span>
        <div className="user-info">{user?.email ?? user?.displayName}</div>
      </div>
    </div>
  );
};

export { LobbyPage };
