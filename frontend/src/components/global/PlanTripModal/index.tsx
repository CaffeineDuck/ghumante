import {
  Box,
  Circle,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSteps } from "chakra-ui-steps";
import Map from "../Map";
interface PlanTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const content = <Flex py={4}>Hello</Flex>;
const steps = [
  { label: "Step 1", content },
  { label: "Step 2", content },
  { label: "Step 3", content },
];
const PlanTripModal: React.FC<PlanTripModalProps> = ({ isOpen, onClose }) => {
  const { nextStep, prevStep, setStep, activeStep } = useSteps({
    initialStep: 0,
  });
  const [address, setAddress] = useState<string>("");
  const renderCorrectContent = () => {
    if (activeStep === 0)
      return (
        <Box border="1">
          <Map
            searchReadOnly={false}
            searchBoxFromTop="5px"
            height="400px"
            width="100%"
            setAddress={setAddress}
          />
        </Box>
      );
  };
  return (
    <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton
          onClick={onClose}
          _hover={{ color: "var(--chakra-colors-primary)" }}
        />
        <ModalBody
          minH="500px"
          px={{ base: "10px", md: "16px", lg: "24px" }}
          py="2rem"
        >
          <Flex>
            <VStack
              p="4"
              w="14rem"
              align="flex-start"
              divider={
                <Box
                  h="2.25rem"
                  w="1.42px"
                  bg="gray.500"
                  position="relative"
                  left="15px"
                />
              }
            >
              {["Map", "Choose Date", "Confirm"].map((item, index) => (
                <Flex
                  key={index}
                  align="center"
                  onClick={() => setStep(index)}
                  cursor="pointer"
                  gap={{ base: "1.5rem", md: "1.82rem" }}
                >
                  <Circle
                    color={activeStep === index ? "light" : "black"}
                    size="30px"
                    bg={activeStep === index ? "primary" : "transparent"}
                    borderColor={"primary"}
                    borderWidth="1px"
                  >
                    {index + 1}
                  </Circle>
                  <Text
                    whiteSpace="nowrap"
                    fontWeight="medium"
                    color={activeStep === index ? "primary" : "gray.500"}
                    fontSize="1.1rem"
                  >
                    {item}
                  </Text>
                </Flex>
              ))}
            </VStack>
            <Box flex="1">{renderCorrectContent()}</Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlanTripModal;
