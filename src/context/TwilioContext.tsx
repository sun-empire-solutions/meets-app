import { createContext } from "react";
import { LocalTrack, LocalTrackPublication, Room } from "twilio-video";

const TwilioContext = createContext<IContext>({
  room: null,
  connect: null,
  localTracksPublication: [],
  toggleVideoTrack: null,
});

type IContext = {
  room: Room | null;
  localTracksPublication: LocalTrackPublication[];
  toggleVideoTrack: () => void;
  connect: (token: string) => Promise<void> | null;
};

export { TwilioContext };
