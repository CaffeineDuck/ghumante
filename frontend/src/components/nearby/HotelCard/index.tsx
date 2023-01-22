import { Step, useTripContext } from "@/context/TripContext";
import { mapUrl } from "@/utils/mapUrl";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DestinationCard: React.FC<{
  destination: DestinationInterface;
  as?: "link" | "div";
}> = ({ destination, as }) => {
  return (
    <CardWrapper
      as={as || "link"}
      href={`/nearby/destination-${destination.id}`}
      destination={destination}
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
    </CardWrapper>
  );
};

export default DestinationCard;

export const CardWrapper = ({
  as,
  href,
  children,
  destination,
}: {
  as?: "link" | "div";
  href: string;
  children: React.ReactNode;
  destination: DestinationInterface;
}) => {
  const { addStep, occupiedHours, setOccupiedHours } = useTripContext();

  const onClick = () => {
    const step: Step = {
      stepNumber: -1,

      enabled: true,
      iconName: "material-symbols:temple-buddhist",
      label: destination.name,
      showSidebar: true,
      showInSidebar: true,
      tripInfo: destination
    };

    const visitingTimeInHrs = destination.visiting_time / 60;

    setOccupiedHours(occupiedHours + visitingTimeInHrs);

    addStep(step);
  };
  return as === "link" ? (
    <Box
      as={Link}
      href={href}
      cursor="pointer"
      role="group"
      borderRadius="lg"
      bg="light"
      overflow="hidden"
      _hover={{ shadow: "md" }}
    >
      {children}
    </Box>
  ) : (
    <Box
      onClick={onClick}
      cursor="pointer"
      role="group"
      borderRadius="lg"
      bg="light"
      overflow="hidden"
      _hover={{ shadow: "md" }}
    >
      {children}
    </Box>
  );
};
