import { createContext } from "react";
import { Room } from "twilio-video";

import { ILocalTracksOptions } from "@/types";

const TwilioContext = createContext<IContext>({
  room: null,
  connect: null,
  localTracks: null,
  getAudioAndVideoTracks: null,
  getLocalVideoTrack: null,
  getLocalAudioTrack: null,
  isAcquiringLocalTracks: false,
  removeLocalAudioTrack: null,
  removeLocalVideoTrack: null,
  removeLocalAudioAndVideoTracks: null,
  videoTrack: null,
  audioTrack: null,
});

type IContext = {
  room: Room | null;
  connect: (username: string, room: string) => Promise<void> | null;
} & ILocalTracksOptions;

export { TwilioContext };
