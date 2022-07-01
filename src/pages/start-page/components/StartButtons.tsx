import { Button } from "../../../components/Button";

const StartButtons = ({ createMeeting, handelJoinLink }: IProps) => {
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
        onClick={handelJoinLink}
      />
    </div>
  );
};

type IProps = {
  createMeeting: () => void;
  handelJoinLink: () => void;
};

export { StartButtons };
