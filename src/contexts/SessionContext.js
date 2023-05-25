import { createContext, useState } from "react";

const SessionContext = createContext({});

export function SessionProvider({ children }) {
  const localData = JSON.parse(localStorage.getItem("session"));
  const [session, setSession] = useState(localData);
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContext;
