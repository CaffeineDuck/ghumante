import { Step, useTripContext } from "@/context/TripContext";
import { mapUrl } from "@/utils/mapUrl";
import { parseTime } from "@/utils/time";
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DestinationCard: React.FC<{
  destination: DestinationInterface;
  as?: "link" | "div";
}> = ({ destination, as }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addStep, occupiedHours, setOccupiedHours } = useTripContext();

  const onClick = () => {
    const step: Step = {
      stepNumber: -1,

      enabled: false,
      iconName: "material-symbols:temple-buddhist",
      label: destination.name,
      showSidebar: true,
      showInSidebar: true,
      tripInfo: destination,
    };

    const visitingTimeInHrs = destination.visiting_time / 60;

    setOccupiedHours(occupiedHours + visitingTimeInHrs);

    addStep(step);
  };
  return (
    <CardWrapper
      as={as || "link"}
      href={`/nearby/destination-${destination.id}`}
      destination={destination}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Box
        pos="relative"
        h="10rem"
        sx={{
          "& > .overlay": {
            display: "none",
          },
          "&:hover > .overlay": {
            display: "flex",
          },
        }}
      >
        <Image
          src={mapUrl(destination.photo)}
          layout="fill"
          alt="Hotel"
          objectFit="cover"
        />
        <Box
          cursor="default"
          zIndex={5}
          bg="rgba(0,0,0,0.6)"
          position="absolute"
          left="0"
          bottom="0"
          right="0"
          top="0"
          className="overlay"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            as="span"
            color="light"
            onClick={(e) => {
              onOpen();
              e.preventDefault();
            }}
            cursor="pointer"
          >
            <Icon icon="mdi:magnify-expand" fontSize={25} />
          </Box>
        </Box>
      </Box>
      <Box p="0.7rem" onClick={onClick}>
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
  isOpen,
  onClose,
}: {
  as?: "link" | "div";
  href: string;
  children: React.ReactNode;
  destination: DestinationInterface;
  isOpen: boolean;
  onClose: () => void;
}) => {
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
      cursor="pointer"
      role="group"
      borderRadius="lg"
      bg="bgColor"
      overflow="hidden"
      transition="150ms ease-in"
      _hover={{ shadow: "md" }}
    >
      {children}
      <Modal isOpen={isOpen} size="xl" onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p="0">
          <ModalBody p="0">
            <Flex
              bg="primaryAccent"
              h="15em"
              align="center"
              justify="center"
              position="relative"
              pt="50%"
            >
              <Image
                src={mapUrl(destination.photo)}
                alt={destination.name}
                layout="fill"
                objectFit="cover"
                objectPosition="center top"
              />
            </Flex>
            <Box
              minH="5rem"
              h="fit-content"
              bg="light"
              px="1.25rem"
              py="1.5rem"
            >
              <Text
                as="h5"
                textAlign="left"
                fontSize="1.25rem"
                fontWeight="bold"
              >
                {destination.name}
              </Text>
              <Text
                as="p"
                mt="0.625rem"
                fontSize="1rem"
                textAlign="left"
                fontWeight="normal"
              >
                {destination.description}
              </Text>
              <Stack direction="column" mt="0.5rem" spacing="0.5rem">
                <Flex
                  w="fit-content"
                  fontSize="1rem"
                  color="gray.600"
                  align="center"
                  gap="0.2rem"
                >
                  <Icon icon="ph:map-pin-fill" />
                  <Text as="span">{destination.address}</Text>
                </Flex>
                <Flex
                  w="fit-content"
                  fontSize="1rem"
                  color="gray.600"
                  align="center"
                  gap="0.2rem"
                >
                  <Icon icon="ic:outline-access-time" />
                  <Text as="span">{parseTime(destination.visiting_time)}</Text>
                </Flex>
              </Stack>
              {/* <Flex mt="1.875rem" justify="center" gap="1.375rem">
                <Button
                  variant="ghost"
                  fontWeight="normal"
                  color="gray.2"
                  h="45px"
                  bg="gray.6"
                  _hover={{ bg: "gray.5" }}
                  px="2.34rem"
                  fontSize="1.125rem"
                  disabled={isLoading}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  fontWeight="normal"
                  h="45px"
                  px="2.34rem"
                  color="light"
                  _hover={{ bg: "primaryHover" }}
                  bg="primary"
                  fontSize="1.125rem"
                  onClick={onConfirm}
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  {confirmText}
                </Button> 
              </Flex>*/}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
