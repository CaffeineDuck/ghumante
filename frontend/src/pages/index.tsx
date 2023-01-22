import Head from "next/head";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";

import { Box } from "@chakra-ui/react";
<<<<<<< HEAD
import { TripContextProvider } from "@/context/TripContext";
=======
import { StepContextProvider } from "@/context/StepContext";
import withAuth from "@/hoc/withAuth";
>>>>>>> e537a89 (add: auth)

const Home = () => {
  return (
<<<<<<< HEAD
    <TripContextProvider>
    <>
      <Head>
        <title>Ghumante</title>
      </Head>
      <Box>
        <HeroSection />
        <HowItWorks />
      </Box>
    </>
    </TripContextProvider>
=======
    <StepContextProvider>
      <>
        <Head>
          <title>Ghumante</title>
        </Head>
        <Box>
          <HeroSection />
          <HowItWorks />
        </Box>
      </>
    </StepContextProvider>
>>>>>>> e537a89 (add: auth)
  );
};
export default withAuth(Home);
