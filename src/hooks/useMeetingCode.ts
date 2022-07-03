import { useEffect, useState } from "react";

import {
  getFromStorage,
  removeFromStorage,
  saveToStorage,
} from "../services/storage";

const CODE_KEY = "MEETING_CODE";

const useMeetingCode = () => {
  const [meetingCode, setMeetingCode] = useState("");

  const saveMeetingCode = (code: string) => {
    saveToStorage(CODE_KEY, code);
    setMeetingCode(code);
  };

  const removeMeetingCode = () => {
    removeFromStorage(CODE_KEY);
  };

  useEffect(() => {
    saveMeetingCode(getFromStorage(CODE_KEY) ?? "");
  }, []);

  return { meetingCode, saveMeetingCode, removeMeetingCode };
};

export { useMeetingCode };
