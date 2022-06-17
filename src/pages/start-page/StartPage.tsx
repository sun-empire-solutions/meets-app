import { useMemo, useState } from "react";

import { StartButtons } from "./components/StartButtons";

//@ts-ignore
import linkImageSrc from "./../../assets/images/meeting-link.png";

const StartPage = () => {
  const [meetings, setMeetings] = useState([]);
  const haveMeetings = useMemo(() => meetings.length > 0, [meetings]);

  return (
    <div className="start-page">
      <StartButtons />
      {haveMeetings ? (
        <div className="meetings">
          <h5 className="title">Meetings</h5>
          <div className="meeting-list"></div>
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
