import { Logger } from "twilio-video";

import { TwilioContext } from "../context/TwilioContext";
import { useLocalTracks } from "../hooks/useLocalTracks";
import { useRoom } from "../hooks/useRoom";
import { useTracksSettings } from "../hooks/useTracksSettings";

const logger = Logger.getLogger("twilio-video");

const originalFactory = logger.methodFactory;
logger.methodFactory = (methodName, logLevel, loggerName) => {
  const method = originalFactory(methodName, logLevel, loggerName);
  return (datetime, logLevel, component, message, data) => {
    const prefix = "[Meet app]";
    if (logLevel !== "debug") {
      method(prefix, datetime, logLevel, component, message, data);
    }
  };
};
logger.setLevel("info");

const TwilioProvider = ({ children }: IProps) => {
  const { room, connect } = useRoom();
  const trackSettings = useTracksSettings();
  const localTracks = useLocalTracks(room, trackSettings);

  return (
    <TwilioContext.Provider
      value={{
        room,
        connect,
        ...localTracks,
        ...trackSettings,
      }}
    >
      {children}
    </TwilioContext.Provider>
  );
};

type IProps = {
  children: JSX.Element;
};

export { TwilioProvider };
