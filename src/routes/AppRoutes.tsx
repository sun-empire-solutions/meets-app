import { BrowserRouter, Route, Routes } from "react-router-dom";

import { withAuthGuard, withLoginGuard } from "../guards";
import { AppLayout } from "../layouts/AppLayout";
import { LobbyPage, LoginPage, MeetingPage, StartPage } from "../pages";

const AppRoutes = () => (
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

export { AppRoutes };
