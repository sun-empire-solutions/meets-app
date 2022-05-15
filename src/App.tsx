import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LobbyPage } from "./pages/LobbyPage";
import { MeetingPage } from "./pages/MeetingPage";
import { StartPage } from "./pages/StartPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/metting" element={<MeetingPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export { App };
