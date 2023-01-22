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
import React, { useContext, useEffect, useState } from "react";
import {
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import AppContext from "@/context/AppContext";
import useCustomToast from "@/hooks/useCustomToast";
//import useCurrentStep from "@/hooks/useCurrentStep";
import { useStepContext } from "@/context/StepContext";
import { ColorChangingCircle } from "./ColorChangingCircle";
interface PlanTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlanTripModal: React.FC<PlanTripModalProps> = ({ isOpen, onClose }) => {
  const toast = useCustomToast();

  const {
    steps,
    currentStep,
    setCurrentStep,
    arrivalDateTime,
    departureDateTime,
  } = useStepContext();

  return (
<<<<<<< HEAD

    <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton
          onClick={onClose}
          _hover={{ color: "var(--chakra-colors-primary)" }}
        />
        <ModalBody
          transition="200ms linear"
          minHeight={"768px"}
          px={{ base: "10px", md: "16px", lg: "24px" }}
          py="2rem"
          minH="30rem"
        >
          <Flex gap={{ base: "1.5rem" }} justify="center">
            {currentStep.showSidebar && (
              <VStack
                px="4"
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
                {arrivalDateTime && (
                  <Flex align="center" gap={{ base: "1.5rem", md: "1.82rem" }}>
                    <ColorChangingCircle
                      currentStepNumber={0}
                      stepNumber={1}
                      iconName={"material-symbols:timer"}
                    />

                    <Text
                      whiteSpace="nowrap"
                      fontWeight="medium"
                      color={"primary"}
                      fontSize="1.1rem"
                    >
                      {arrivalDateTime}
                    </Text>
                  </Flex>
                )}
                {steps.map((step) => {
                  return (
                    step.showInSidebar && (
                      <Flex
                        key={step.label}
                        align="center"
                        onClick={() => setCurrentStep(step)}
                        cursor="pointer"
                        gap={{ base: "1.5rem", md: "1.82rem" }}
                      >
                        <ColorChangingCircle
                          currentStepNumber={currentStep.stepNumber}
                          stepNumber={step.stepNumber}
                          iconName={step.iconName}
                        />

                        <Text
                          whiteSpace="nowrap"
                          fontWeight="medium"
                          color={
                            currentStep.stepNumber === step.stepNumber
                              ? "primary"
                              : "gray.500"
                          }
                          fontSize="1.1rem"
                        >
                          {step.label}
                        </Text>
                      </Flex>
                    )
                  );
                })}
                {departureDateTime && (
                  <Flex align="center" gap={{ base: "1.5rem", md: "1.82rem" }}>
                    <ColorChangingCircle
                      currentStepNumber={0}
                      stepNumber={1}
                      iconName={"material-symbols:timer"}
                    />

                    <Text
                      whiteSpace="nowrap"
                      fontWeight="medium"
                      color={"primary"}
                      fontSize="1.1rem"
                    >
                      {departureDateTime}
                    </Text>
                  </Flex>
                )}
              </VStack>
            )}

            <Box flex="1">
              <currentStep.component />
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlanTripModal;
