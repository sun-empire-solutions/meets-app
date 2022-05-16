import { TrackButton } from "../components/TrackButton";
import { useState } from "react";

const StartPage = () => {
  const [ActiveCam, setActiveCam] = useState(true);
  const [ActiveMicr, setActiveMicr] = useState(true);

  const changeActiveCam = () => {
    if (ActiveCam) {
      setActiveCam(false);
      return () => ActiveCam;
    }
    setActiveCam(true);
    return () => ActiveCam;
  };

  const changeActiveMic = () => {
    if (ActiveMicr) {
      setActiveMicr(false);
      return () => ActiveMicr;
    }
    setActiveMicr(true);
    return () => ActiveMicr;
  };

  return (
    <div>
      <h1>StartPage</h1>
      <div className="buttons">
        <TrackButton
          type="camara"
          isActive={ActiveCam}
          handlerClick={changeActiveCam}
        />

        <TrackButton
          type="microfono"
          isActive={ActiveMicr}
          handlerClick={changeActiveMic}
        />
      </div>
    </div>
  );
};

export { StartPage };
