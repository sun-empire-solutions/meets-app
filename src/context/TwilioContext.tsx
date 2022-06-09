import { createContext } from "react";
import {
  LocalAudioTrackPublication,
  LocalVideoTrackPublication,
  Room,
} from "twilio-video";
import { TrackSettings } from "../hooks/useTracksSettings";

const TwilioContext = createContext<IContext>({
  room: null,
  connect: null,
  localVideoTrackPublication: null,
  localAudioTrackPublication: null,
  isAudioEnabled: false,
  isVideoEnabled: false,
  saveAudioSettings: null,
  saveVideoSettings: null,
  getAudioSettings: null,
  getVideoSettings: null,
  toggleVideoTrack: null,
  toggleAudioTrack: null,
  cleanStorage: null,
  clearTracks: null,
});

type IContext = {
  room: Room | null;
  localAudioTrackPublication: LocalAudioTrackPublication;
  localVideoTrackPublication: LocalVideoTrackPublication;
  toggleVideoTrack: () => void;
  toggleAudioTrack: () => void;
  clearTracks: () => void;
  connect: (token: string) => Promise<void> | null;
} & TrackSettings;

export { TwilioContext };
