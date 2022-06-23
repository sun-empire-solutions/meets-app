import {useEffect, useState} from "react";
import {getFromStorage, saveToStorage} from "../../../services/storage";

const CODE_KEY = "MEETING_CODE"

const useMeetingCode = () => {
    const [meetingCode, setMeetingCode] = useState("");

    const saveMeetingCode = (code: string) => {
        saveToStorage(CODE_KEY, code);
        setMeetingCode(code);
    }

    useEffect(() => {
        saveMeetingCode(getFromStorage(CODE_KEY) ?? "");
    }, [])

    return {meetingCode, saveMeetingCode}
}

export {useMeetingCode}