import { AppContextProps } from "./AppContext.d";
import { createContext } from "react";

const AppContext = createContext<AppContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  profile: null,
  setProfile: () => {},
  coOrdinates: {
    lat: 0,
    long: 0,
  },
  setCoOrdinates: () => {},
  address: "",
  setAddress: () => {},
});

export default AppContext;
