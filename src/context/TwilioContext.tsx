import { createContext } from "react";
import {
  LocalAudioTrackPublication,
  LocalVideoTrackPublication,
  Room,
} from "twilio-video";

const TwilioContext = createContext<IContext>({
  room: null,
  connect: null,
  localVideoTrackPublication: null,
  localAudioTrackPublication: null,
  toggleVideoTrack: null,
  toggleAudioTrack: null,
});

type IContext = {
  room: Room | null;
  localAudioTrackPublication: LocalAudioTrackPublication;
  localVideoTrackPublication: LocalVideoTrackPublication;
  toggleVideoTrack: () => void;
  toggleAudioTrack: () => void;
  connect: (token: string) => Promise<void> | null;
};

export { TwilioContext };
