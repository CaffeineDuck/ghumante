import Head from "next/head";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";

import { Box } from "@chakra-ui/react";
import { StepContextProvider } from "@/context/StepContext";

export default function Home() {
  return (
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
  );
}
