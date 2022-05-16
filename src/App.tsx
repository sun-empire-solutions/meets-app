import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";

import { LobbyPage } from "./pages/LobbyPage";
import { MeetingPage } from "./pages/MeetingPage";
import { StartPage } from "./pages/StartPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<StartPage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/metting" element={<MeetingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export { App };
