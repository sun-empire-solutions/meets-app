import { LocalVideoTrack, RemoteVideoTrack } from "twilio-video";

declare module "twilio-video" {
  // These help to create union types between Local and Remote VideoTracks
  interface LocalVideoTrack {
    isSwitchedOff: undefined;
    setPriority: undefined;
  }
}

export type IMeeting = {
  code: string;
  timestamp: string;
};

export type IVideoTrack = LocalVideoTrack | RemoteVideoTrack;
