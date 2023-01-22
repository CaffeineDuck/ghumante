import { Box, Text } from "@chakra-ui/react";

import React from "react";

import PhoneVerification from "@/components/global/PhoneVerification";
const LoginPage = () => {
  return (
    <Box maxW="2xl" bg="light" mx="auto" my="3rem" borderRadius="lg" p="3rem">
      <Text fontSize="2rem" fontWeight="bold" my="2rem" textAlign="center">
        Getting started to{" "}
        <Text as="span" color="primary">
          Ghumante
        </Text>
      </Text>
      <PhoneVerification />
    </Box>
  );
};

export default LoginPage;
