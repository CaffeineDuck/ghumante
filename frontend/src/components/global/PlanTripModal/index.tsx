import {
  Box,
  Button,
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
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import ChooseDate from "../ChooseDate";
import { Icon } from "@iconify/react";
interface PlanTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlanTripModal: React.FC<PlanTripModalProps> = ({ isOpen, onClose }) => {
  const { nextStep, prevStep, setStep, activeStep } = useSteps({
    initialStep: 0,
  });
  const method = useForm({ mode: "all" });
  const { handleSubmit } = method;
  const [address, setAddress] = useState<string>("");
  const onSubmit = async (values: FieldValues) => {};
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
          <Flex justify="end" mt="4rem">
            <Button
              variant={"solid"}
              colorScheme={"primaryScheme"}
              size={"lg"}
              onClick={nextStep}
              rightIcon={
                <Icon fontSize={18} icon="material-symbols:arrow-right-alt" />
              }
            >
              Continue
            </Button>
          </Flex>
        </Box>
      );
    else if (activeStep === 1)
      return <ChooseDate onContinue={() => nextStep()} />;
  };
  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton
          onClick={onClose}
          _hover={{ color: "var(--chakra-colors-primary)" }}
        />
        <ModalBody
          transition="200ms linear"
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
            <Box flex="1">
              <FormProvider {...method}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {renderCorrectContent()}
                </form>
              </FormProvider>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlanTripModal;
