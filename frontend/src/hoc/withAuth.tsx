import AppContext from "@/context/AppContext";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { ComponentType, FC, useContext, useEffect } from "react";

const withAuth = (Component: ComponentType): FC => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { user } = useGetCurrentUser();
    const { setIsAuthenticated, setProfile } = useContext(AppContext);
    useEffect(() => {
      if (user) {
        setIsAuthenticated(true);
        setProfile(user);
        return;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return <Component {...props} />;
  };
};

export default withAuth;
