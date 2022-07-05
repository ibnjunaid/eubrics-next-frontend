import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";

interface behaviourState {
  behaviourId: number,
  behaviourName: string
}
interface UserCred {
  username: string,
  access_token: string
}

export interface AppContext {
  userCred: UserCred | null, 
  setUserCred: (arg0: UserCred | null) => void,
  selectedBehaviour: behaviourState | null,
  setSelectedBehaviour: (arg0: behaviourState | null) => void
}

export const appContext = createContext<AppContext | null >(null);

function MyApp({ Component, pageProps }: AppProps) {
  const [userCred, setUserCred] = useState<UserCred| null>(null);
  const [selectedBehaviour, setSelectedBehaviour] = useState<behaviourState | null>(null);
  return (
    <appContext.Provider value={{userCred, setUserCred, selectedBehaviour, setSelectedBehaviour }}>
      <Component {...pageProps} />
    </appContext.Provider>
  );
}

export default MyApp;
