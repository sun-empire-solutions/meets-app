import { useContext, useState } from "react";
import { Participant } from "twilio-video";
import { useNavigate } from "react-router-dom";
import { TwilioContext } from "../context/TwilioContext";
import { Button } from "../components/Button";

const StartPage = () => {
  const [buttonText, setButtonText] = useState("Join call");
  const [username, setUsername] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { connect } = useContext(TwilioContext);
  const navigate = useNavigate();

  const connectButtonHandler = async () => {
    if (!username) {
      alert("Enter your name before connecting");
      return;
    }
    setIsButtonDisabled(true);
    setButtonText("Connecting...");
    try {
      await connect(username);
      setButtonText("Leave call");
      setIsButtonDisabled(false);
      navigate("/lobby");
    } catch {
      alert("Connection failed. Is the backend running?");
      setButtonText("Join call");
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="start-page">
      <div className="meeting-buttons">
        <Button text="New meeting" classNames="meeting" />
        <Button text="Join with a code" classNames="join" />
      </div>
      <div className="meetings">
        <div className="title">
          <h5>Meetings</h5>
        </div>
        <div className="meeting-list"></div>
      </div>
    </div>
  );
};

const participantConnected = (participant: Participant) => {
  console.log("Participant connected: ", participant.identity);
};

const participantDisconnected = (participant) => {
  document.getElementById(participant.sid).remove();
  //   updateParticipantCount();
};

const trackSubscribed = (div, track) => {
  div.appendChild(track.attach());
};

const trackUnsubscribed = (track) => {
  track.detach().forEach((element) => element.remove());
};

export { StartPage };
