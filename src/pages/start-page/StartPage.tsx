import { useMemo, useState } from "react";

import { StartButtons } from "./components/StartButtons";
import { useMeetings } from "./hooks/use-meetings";
import { Input } from "../../components/Input";
import { Button } from "./../../components/Button";
import { MeetingList } from "./components/MeetingList";
import { Modal } from "../../components/Modal";

//@ts-ignore
import linkImageSrc from "./../../assets/images/meeting-link.png";

const StartPage = () => {
  const { meetings, createNewMeeting, removeMeeting, isLoading } =
    useMeetings();
  const haveMeetings = useMemo(() => meetings.length > 0, [meetings]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return null;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="start-page">
      <Modal
        isOpen={isModalOpen}
        title="Join with code"
        body={
          <div className="start-page__modal-body">
            <Input placeholder="Ej: abc-mnop-xyz" />
          </div>
        }
        footer={
          <Button
            classNames="join-code-button"
            onClick={openModal}
            text="Join"
          />
        }
        onClose={closeModal}
      />
      <StartButtons
        createMeeting={createNewMeeting}
        handelJoinLink={openModal}
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
