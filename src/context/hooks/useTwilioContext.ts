import { useContext } from "react";

import { TwilioContext } from "../TwilioContext";

const useTwilioContext = () => {
  const context = useContext(TwilioContext);

  if (!context) {
    throw new Error("useTwilioContext must be used within a TwilioProvider");
  }

  return context;
};

export { useTwilioContext };
