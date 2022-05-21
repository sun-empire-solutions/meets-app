import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppLayout } from "./layouts/AppLayout";
import { LobbyPage, LoginPage, MeetingPage, StartPage } from "./pages";
import { withLoginGuard, withAuthGuard } from "./guards";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={withLoginGuard(<LoginPage />)} />
          <Route path="/start" element={withAuthGuard(<StartPage />)} />
          <Route path="/lobby" element={withAuthGuard(<LobbyPage />)} />
          <Route path="/meeting" element={withAuthGuard(<MeetingPage />)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export { App };
