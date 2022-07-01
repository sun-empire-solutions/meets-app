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
  clearTracks: null,
  switchCamera: null,
  isFrontCameraEnabled: null,
});

type IContext = {
  room: Room | null;
  localAudioTrackPublication: LocalAudioTrackPublication;
  localVideoTrackPublication: LocalVideoTrackPublication;
  isFrontCameraEnabled: boolean;
  toggleVideoTrack: () => void;
  toggleAudioTrack: () => void;
  clearTracks: () => void;
  switchCamera: () => void;
  connect: (username: string, room: string) => Promise<void> | null;
} & TrackSettings;

export { TwilioContext };
