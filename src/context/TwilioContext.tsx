import { createContext } from "react";
import { Room } from "twilio-video";

import { TrackSettings } from "../hooks/useTracksSettings";
import { ILocalTracksOptions } from "../types";

const TwilioContext = createContext<IContext>({
  room: null,
  connect: null,
  isAudioEnabled: false,
  isVideoEnabled: false,
  saveAudioSettings: null,
  saveVideoSettings: null,
  getAudioSettings: null,
  getVideoSettings: null,
  localTracks: null,
  getAudioAndVideoTracks: null,
  getLocalVideoTrack: null,
  getLocalAudioTrack: null,
  isAcquiringLocalTracks: false,
  removeLocalAudioTrack: null,
  removeLocalVideoTrack: null,
  isAcquiringLocalVideoTrack: false,
  videoTrack: null,
});

type IContext = {
  room: Room | null;
  connect: (username: string, room: string) => Promise<void> | null;
} & ILocalTracksOptions &
  TrackSettings;

export { TwilioContext };
