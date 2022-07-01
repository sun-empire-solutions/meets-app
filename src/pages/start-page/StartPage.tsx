import { useMemo } from "react";
import { StartButtons } from "./components/StartButtons";
import { useMeetings } from "./hooks/use-meetings";
import { useState, useEffect } from "react";
import { Input } from "../../components/Input";
import { Button } from "./../../components/Button";
//@ts-ignore
import linkImageSrc from "./../../assets/images/meeting-link.png";
import { MeetingList } from "./components/MeetingList";

const StartPage = () => {
  const { meetings, createNewMeeting, removeMeeting, isLoading } =
    useMeetings();

  const haveMeetings = useMemo(() => meetings.length > 0, [meetings]);
  const [isContainerJoinLinkVisible, setisContainerJoinLinkVisible] =
    useState(false);

  useEffect(() => {
    if (isContainerJoinLinkVisible == true) {
      setisContainerJoinLinkVisible(false);
    }
  }, [meetings]);

  if (isLoading) {
    return null;
  }

  const ContainerJoinLink = () => {
    if (isContainerJoinLinkVisible == false) {
      return setisContainerJoinLinkVisible(true);
    }
    return setisContainerJoinLinkVisible(false);
  };

  const handelClickJoinLink = () => {
    console.log("Hola mundo");
  };

  return (
    <div className="start-page">
      {isContainerJoinLinkVisible && (
        <div className="container-join-link">
          <h3>Join with a code</h3>
          <h4>Enter the code provided by the organizer of the meeting:</h4>
          <Input classNames="input-link" placeholder="Ej: abc-mnop-xyz" />
          <Button
            classNames="button-join-link"
            onClick={handelClickJoinLink}
            text="Join"
          />
        </div>
      )}
      <StartButtons
        createMeeting={createNewMeeting}
        handelJoinLink={ContainerJoinLink}
      />
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
