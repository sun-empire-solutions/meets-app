const MEETING_AVAILABLE_MINUTES = 30;

const DEFAULT_VIDEO_CONSTRAINTS: MediaStreamConstraints["video"] = {
  width: 1280,
  height: 720,
  frameRate: 24,
};

// These are used to store the selected media devices in localStorage
const SELECTED_AUDIO_INPUT_KEY = "TwilioVideoApp-selectedAudioInput";
const SELECTED_AUDIO_OUTPUT_KEY = "TwilioVideoApp-selectedAudioOutput";
const SELECTED_VIDEO_INPUT_KEY = "TwilioVideoApp-selectedVideoInput";

// This is used to store the current background settings in localStorage
const SELECTED_BACKGROUND_SETTINGS_KEY =
  "TwilioVideoApp-selectedBackgroundSettings";

export {
  MEETING_AVAILABLE_MINUTES,
  DEFAULT_VIDEO_CONSTRAINTS,
  SELECTED_AUDIO_INPUT_KEY,
  SELECTED_AUDIO_OUTPUT_KEY,
  SELECTED_VIDEO_INPUT_KEY,
  SELECTED_BACKGROUND_SETTINGS_KEY,
};
