import { mapUrl } from "@/utils/mapUrl";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DestinationCard: React.FC<{ destination: DestinationInterface }> = ({
  destination,
}) => {
  return (
    <Box
      as={Link}
      href={`/nearby/destination-${destination.id}`}
      cursor="pointer"
      role="group"
      borderRadius="lg"
      bg="light"
      overflow="hidden"
      _hover={{ shadow: "md" }}
    >
      <Box pos="relative" h="10rem">
        <Image
          src={mapUrl(destination.photo)}
          layout="fill"
          alt="Hotel"
          objectFit="cover"
        />
      </Box>
      <Box p="0.7rem">
        <Text
          as="h3"
          isTruncated
          fontSize="1.2rem"
          fontWeight="semibold"
          _groupHover={{ color: "green.400" }}
        >
          {destination.name}
        </Text>
        <Text as="p" fontSize="0.8rem" color="gray.500" noOfLines={2}>
          {destination.description}
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
            <Text as="span">4.0</Text>
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
};

export default DestinationCard;
