import { Room, TwilioError } from "twilio-video";
import { useEffect } from "react";

const useHandleRoomDisconnection = (
  room: Room | null,
  removeLocalAudioTrack: () => void,
  removeLocalVideoTrack: () => void
) => {
  useEffect(() => {
    if (room) {
      const onDisconnected = (_: Room, error: TwilioError) => {
        if (error) {
          console.log(error);
        }

        removeLocalAudioTrack();
        removeLocalVideoTrack();
      };

      room.on("disconnected", onDisconnected);
      return () => {
        room.off("disconnected", onDisconnected);
      };
    }
  }, [room, removeLocalAudioTrack, removeLocalVideoTrack]);
};

export { useHandleRoomDisconnection };
