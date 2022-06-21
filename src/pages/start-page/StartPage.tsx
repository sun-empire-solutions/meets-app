import { useMemo } from "react";
import { StartButtons } from "./components/StartButtons";
import { useMeetings } from "./hooks/use-meetings";
import { FiLink2 } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
//@ts-ignore
import linkImageSrc from "./../../assets/images/meeting-link.png";

const StartPage = () => {
  const { meetings, createNewMeeting, isLoading } = useMeetings();
  const haveMeetings = useMemo(() => meetings.length > 0, [meetings]);

  const CopyLink = (code) => {
    navigator.clipboard.writeText(`${code}`);
    document.getElementById(`copy-icon-${code}`).style.display = "none";
    document.getElementById(`check-icon-${code}`).style.display = "inherit";

    setTimeout(() => {
      document.getElementById(`copy-icon-${code}`).style.display = "inherit";
      document.getElementById(`check-icon-${code}`).style.display = "none";
    }, 1000);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="start-page">
      <StartButtons createMeeting={createNewMeeting} />
      {haveMeetings ? (
        <div className="meetings">
          <h5 className="title">Meetings</h5>
          <div className="meeting-list">
            {meetings.map(({ code }) => (
              <div key={code} className="meeting-item">
                <div className="link">
                  <div className="icon-link">
                    <FiLink2 />
                  </div>
                  {code}
                </div>

                <div className="icon-copy-link  ">
                  <MdContentCopy
                    id={`copy-icon-${code}`}
                    size={22}
                    onClick={() => CopyLink(code)}
                  />
                  <BsCheckLg
                    id={`check-icon-${code}`}
                    size={18}
                    display="none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="info-message">
          <div className="info-message_image">
            <img src={linkImageSrc} alt="Link" />
          </div>
          <div className="info-message_title">Get a lik you can share</div>
          <div className="info-message_subtitle">
            Tap <strong>New meeting</strong> to get a link you can send to
            people yo want to meet with
          </div>
        </div>
      )}
    </div>
  );
};

export { StartPage };
