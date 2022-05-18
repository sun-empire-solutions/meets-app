import { TwilioContext } from "../context/TwilioContext";
import { useLocalTracks } from "../hooks/useLocalTracks";
import { useRoom } from "../hooks/useRoom";

const TwilioProvider = ({ children }: IProps) => {
  const { room, connect } = useRoom();
  const {
    localAudioTrackPublication,
    localVideoTrackPublication,
    toggleVideoTrack,
    toggleAudioTrack,
  } = useLocalTracks(room);

  return (
    <TwilioContext.Provider
      value={{
        room,
        connect,
        localVideoTrackPublication,
        localAudioTrackPublication,
        toggleVideoTrack,
        toggleAudioTrack,
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
