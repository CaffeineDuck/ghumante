export interface AppContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: null | Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  coOrdinates: CoOrdinateInterface;
  setCoOrdinates: React.Dispatch<React.SetStateAction<CoOrdinateInterface>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}
