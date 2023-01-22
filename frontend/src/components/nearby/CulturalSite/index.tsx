import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

const CulturalSite = () => {
  return (
    <Box
      cursor="pointer"
      role="group"
      borderRadius="lg"
      bg="light"
      overflow="hidden"
      _hover={{ shadow: "md" }}
    >
      <Box pos="relative" h="10rem">
        <Image src="/temple.jpeg" layout="fill" alt="Hotel" objectFit="cover" />
      </Box>
      <Box p="0.7rem">
        <Text
          as="h3"
          isTruncated
          fontSize="1.2rem"
          fontWeight="semibold"
          _groupHover={{ color: "green.400" }}
        >
          Manakamana Temple
        </Text>
        <Text as="p" fontSize="0.8rem" color="gray.500" noOfLines={2}>
          A best place to fulfill your religious spirit.
        </Text>
        <Stack direction="row" mt="0.5rem">
          <Flex
            w="fit-content"
            fontSize="0.9rem"
            color="gray.600"
            align="center"
            gap="0.2rem"
          >
            <Icon icon="ph:map-pin-fill" />
            <Text as="span">0.3km</Text>
          </Flex>
          <Flex
            w="fit-content"
            fontSize="0.9rem"
            color="gray.600"
            align="center"
            gap="0.2rem"
          >
            <Icon icon="material-symbols:star-rounded" />
            <Text as="span">4.0 / 5</Text>
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
};

export default CulturalSite;
