import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppLayout } from "./layouts/AppLayout";
import { LobbyPage, LoginPage, MeetingPage, StartPage } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/meeting" element={<MeetingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export { App };
