import React, { useEffect, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "@/components/global/Navbar";
import Footer from "../Footer";
import AppContext from "@/context/AppContext";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
const DefaultLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [address, setAddress] = useState<string>("");
  const [coOrdinates, setCoOrdinates] = useState({ lat: 0, long: 0 });

  const { user } = useGetCurrentUser();
  useEffect(() => {
    if (user) {
      setProfile(user);
      setIsAuthenticated(true);
    } else {
      setProfile(null);
      setIsAuthenticated(false);
    }
  }, [user]);
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        coOrdinates,
        setCoOrdinates,
        address,
        setAddress,
      }}
    >
      <Box w="full" minH="100vh" display="flex" flexDir="column">
        <Navbar />
        <Container
          maxW="container.mw"
          mx="auto"
          px={{ base: "1.2rem", md: "5rem", lg: "6rem" }}
          as="main"
        >
          {children}
        </Container>
        <Footer />
      </Box>
    </AppContext.Provider>
  );
};

export default DefaultLayout;
