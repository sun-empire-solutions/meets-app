import { Button } from "../../../components/Button";

const StartButtons = ({ createMeeting }: IProps) => (
  <div className="start-page_buttons">
    <Button
      text="New meeting"
      classNames="meeting-button"
      onClick={createMeeting}
    />
    <Button
      text="Join with a code"
      classNames="join-button"
      onClick={() => {}}
    />
  </div>
);

type IProps = {
  createMeeting: () => void;
};

export { StartButtons };
