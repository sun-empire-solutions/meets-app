import { Button } from "../../../components";

const StartButtons = ({ createMeeting, joinMeetingWithCode }: IProps) => {
  return (
    <div className="start-page_buttons">
      <Button
        text="New meeting"
        classNames="meeting-button"
        onClick={createMeeting}
      />
      <Button
        text="Join with a code"
        classNames="join-button"
        onClick={joinMeetingWithCode}
      />
    </div>
  );
};

type IProps = {
  createMeeting: () => void;
  joinMeetingWithCode: () => void;
};

export { StartButtons };
