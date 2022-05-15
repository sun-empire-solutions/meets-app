import { useState } from "react";
import { connect as twilioConnect, Participant } from "twilio-video";

const StartPage = () => {
  const [buttonText, setButtonText] = useState("Join call");
  const [username, setUsername] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
    } catch {
      alert("Connection failed. Is the backend running?");
      setButtonText("Join call");
      setIsButtonDisabled(false);
    }
  };

  return (
    <div>
      <h1>StartPage</h1>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <button disabled={isButtonDisabled} onClick={connectButtonHandler}>
        {buttonText}
      </button>
    </div>
  );
};

const connect = async (username) => {
  const response = await fetch(`${process.env.API_URL}/functions/get_token`, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username }),
  });
  const data = await response.json();
  const room = await twilioConnect(data.token);
  room.participants.forEach(participantConnected);
  room.on("participantConnected", participantConnected);
  room.on("participantDisconnected", participantDisconnected);
  //   connected = true;
  //   updateParticipantCount();
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
