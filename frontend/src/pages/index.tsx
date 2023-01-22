import Head from "next/head";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";

import { Box } from "@chakra-ui/react";
import { TripContextProvider } from "@/context/TripContext";
import withAuth from "@/hoc/withAuth";

const Home = () => {
  return (
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
  );
};
export default withAuth(Home);
