import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from "styled-components";
import Header from "./components/Header";
import { SessionProvider } from "./contexts/SessionContext";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Header />
        <PageStyle>
          <Routes>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/followers" element={<FollowersPage />} />
            <Route path="/following" element={<FollowingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/:username" element={<UserPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </PageStyle>
      </SessionProvider>
    </BrowserRouter>
  );
}

const PageStyle = styled.div`
  font-family: "Roboto", sans-serif;
  margin-top: 65px;
`;

export default App;
