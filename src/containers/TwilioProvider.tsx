import { TwilioContext } from "../context/TwilioContext";
import { useLocalTracks } from "../hooks/useLocalTracks";
import { useRoom } from "../hooks/useRoom";

const TwilioProvider = ({ children }: IProps) => {
  const { room, connect } = useRoom();
  const { localTracksPublication, toggleVideoTrack } = useLocalTracks(room);

  return (
    <TwilioContext.Provider
      value={{ room, connect, localTracksPublication, toggleVideoTrack }}
    >
      {children}
    </TwilioContext.Provider>
  );
};

type IProps = {
  children: JSX.Element;
};

export { TwilioProvider };
