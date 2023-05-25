import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SessionContext from "./contexts/SessionContext";

function App() {
  const { session } = useContext(SessionContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element="" />
        <Route path="/signin" element="" />
        <Route path="/signup" element="" />
        <Route path="/folowers" element="" />
        <Route path="/folowing" element="" />
        <Route path="/search" element="" />
        <Route path="/user/:username" element="" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
