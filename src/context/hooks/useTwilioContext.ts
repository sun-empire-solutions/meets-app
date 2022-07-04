import { useContext } from "react";

import { TwilioContext } from "../TwilioContext";

const useTwilioContext = () => {
  const context = useContext(TwilioContext);
  return context;
};

export { useTwilioContext };
