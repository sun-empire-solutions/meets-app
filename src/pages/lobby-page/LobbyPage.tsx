import { useEffect, useMemo, useState } from "react";
import { MdContentCopy, MdOutlineIosShare } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { useWindowWidth } from "@react-hook/window-size";
import { FiLink } from "react-icons/fi";

import { LoadingIndicator, JoinButton, TrackButtons } from "@/components";
import { useTwilioContext } from "@/context";
import { useAuthUser, useMeetingCode, useTracksSettings } from "@/hooks";

import { LocalVideoPreview } from "./components/LocalVideoPreview";

const LobbyPage = () => {
  const {
    getAudioAndVideoTracks,
    removeLocalAudioAndVideoTracks,
    isAcquiringLocalTracks,
  } = useTwilioContext();
  const { getVideoSettings } = useTracksSettings();
  const isVideoEnabled = getVideoSettings();
  const { meetingCode } = useMeetingCode();
  const { user } = useAuthUser();
  const width = useWindowWidth();
  const isMobile = useMemo(() => width < 768, [width]);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    getAudioAndVideoTracks().then(() => {
      setIsLoading(false);
    });

    return () => {
      removeLocalAudioAndVideoTracks();
    };
  }, []);

  if (isLoading || (isAcquiringLocalTracks && isVideoEnabled)) {
    return <LoadingIndicator />;
  }

  return (
    <div className="lobby-page">
      <div className="lobby-page_preview-section">
        <h3 className="meeting-code">{meetingCode}</h3>
        <div className="video-preview">
          <LocalVideoPreview />
          <TrackButtons className="lobby-track-buttons" />
        </div>
      </div>
      <div className="lobby-page_share-section">
        <div className="share-message">All ready to join?</div>
        <div className="meeting-share">
          <div className="info-icon">
            <FiLink size={20} />
          </div>
          <div className="share-code">{meetingCode}</div>
          {isMobile ? (
            <div className="share-icon" role="button" onClick={handleShare}>
              <MdOutlineIosShare size={24} />
            </div>
          ) : isCopied ? (
            <BsCheckLg color="#44dd44" size={18} />
          ) : (
            <div className="share-icon">
              <MdContentCopy
                color="#aaaeb2"
                size={24}
                onClick={copyCodeToClipboard}
              />
            </div>
          )}
        </div>
        <div className="meeting-join">
          <JoinButton />
          <span className="join-message">Joining as</span>
          <div className="user-info">{user?.email ?? user?.displayName}</div>
        </div>
      </div>
    </div>
  );
};

export { LobbyPage };
