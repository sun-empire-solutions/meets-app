import { createContext } from "react";
import {
  LocalAudioTrackPublication,
  LocalVideoTrackPublication,
  Room,
} from "twilio-video";
import { LocalTracksTypes } from "../hooks/useLocalTracks";
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
  hasMultipleVideoInputs: null,
  setVideoInputDevices: null,
  isSwitchingCamera: null,
});

type IContext = {
  room: Room | null;
  connect: (username: string, room: string) => Promise<void> | null;
} & LocalTracksTypes &
  TrackSettings;

export { TwilioContext };
