import { useMemo } from "react";

import { StartButtons } from "./components/StartButtons";
import { useMeetings } from "./hooks/use-meetings";

//@ts-ignore
import linkImageSrc from "./../../assets/images/meeting-link.png";
import { MeetingList } from "./components/MeetingList";

const StartPage = () => {
  const { meetings, createNewMeeting, removeMeeting, isLoading } =
    useMeetings();
  const haveMeetings = useMemo(() => meetings.length > 0, [meetings]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="start-page">
      <StartButtons createMeeting={createNewMeeting} />
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
  );
};

export { StartPage };
