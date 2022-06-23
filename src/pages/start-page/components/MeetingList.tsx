import { MeetingLinkItem } from "./MeetingLinkItem";
import { IMeeting } from "../hooks/use-meetings";

const MeetingList = ({ meetings }: IProps) => {
  return (
    <div className="meetings">
      <h5 className="title">Meetings</h5>
      <div className="meeting-list">
        {meetings.map((meeting) => (
          <MeetingLinkItem key={meeting.code} meeting={meeting} />
        ))}
      </div>
    </div>
  );
};

type IProps = {
  meetings: IMeeting[];
};

export { MeetingList };
