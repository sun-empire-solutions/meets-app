import { StartButtons } from "./components/StartButtons";

const StartPage = () => {
  return (
    <div className="start-page">
      <StartButtons />
      <div className="meetings">
        <h5 className="title">Meetings</h5>
        <div className="meeting-list"></div>
      </div>
    </div>
  );
};

export { StartPage };
