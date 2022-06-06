import { TwilioContext } from "../context/TwilioContext";
import { useLocalTracks } from "../hooks/useLocalTracks";
import { useRoom } from "../hooks/useRoom";
import { useTracksSettings } from "../hooks/useTracksSettings";

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
