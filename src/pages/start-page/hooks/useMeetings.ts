import { useLayoutEffect, useState } from "react";
import randomString from "crypto-random-string";

import { getFromStorage, saveToStorage } from "../../../services/storage";
import { MEETING_AVAILABLE_MINUTES } from "../../../constants";
import { IMeeting } from "@/types";

const MEETINGS_KEY = "MEETINGS";

const useMeetings = () => {
  const [meetings, setMeetings] = useState<IMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const createNewMeeting = () => {
    const code = getRandomCode();
    const meeting: IMeeting = { code, timestamp: Date() };

    setMeetings((meetings) => {
      const newMeetings = [...meetings, meeting];
      saveToStorage(MEETINGS_KEY, newMeetings);
      return newMeetings;
    });
  };

  const removeMeeting = ({ code }: IMeeting) => {
    const meetings = getFromStorage(MEETINGS_KEY);
    const filteredMeetings = meetings.filter(
      (meeting) => meeting.code !== code
    );
    saveToStorage(MEETINGS_KEY, filteredMeetings);
    setMeetings(filteredMeetings);
  };

  useLayoutEffect(() => {
    setMeetings((getFromStorage(MEETINGS_KEY) || []).filter(isMeetingInRange));
    setIsLoading(false);

    return () => {
      if (meetings.length) {
        saveToStorage(MEETINGS_KEY, meetings.filter(isMeetingInRange));
      }
    };
  }, []);

  return { meetings, createNewMeeting, removeMeeting, isLoading };
};

const getRandomCode = () => {
  const threeLengthCode = () =>
    randomString({ length: 3, type: "distinguishable" });
  return `${threeLengthCode()}-${threeLengthCode()}-${threeLengthCode()}`;
};

const isMeetingInRange = (meeting: IMeeting) => {
  return (
    new Date().getTime() - new Date(meeting.timestamp).getTime() <
    1000 * 60 * MEETING_AVAILABLE_MINUTES
  );
};

export { useMeetings };
