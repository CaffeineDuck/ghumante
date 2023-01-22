import Head from "next/head";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";

import { Box } from "@chakra-ui/react";
import { TripContextProvider } from "@/context/TripContext";

export default function Home() {
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
}
