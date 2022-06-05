import { useContext, useState } from "react";
import { Participant } from "twilio-video";
import { useNavigate } from "react-router-dom";
import { TwilioContext } from "../context/TwilioContext";

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
      <div className="star-page-container">
        <h1>StartPage</h1>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button
          className="button"
          disabled={isButtonDisabled}
          onClick={connectButtonHandler}
        >
          {buttonText}
        </button>
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
