import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from "styled-components";
import Header from "./components/Header";
import { SessionProvider } from "./contexts/SessionContext";
import SigninPage from "./pages/SigninPage";

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Header />
        <PageStyle>
          <Routes>
            <Route path="/" element="" />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element="" />
            <Route path="/folowers" element="" />
            <Route path="/folowing" element="" />
            <Route path="/search" element="" />
            <Route path="/user/:username" element="" />
          </Routes>
        </PageStyle>
      </SessionProvider>
    </BrowserRouter>
  );
}

const PageStyle = styled.div`
  font-family: "Roboto", sans-serif;
  margin-top: 65px;
  /* background: #f7f4f3; */
`;

export default App;
