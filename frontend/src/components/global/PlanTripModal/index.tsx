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
import React, { useContext, useState } from "react";
import {
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import AppContext from "@/context/AppContext";
import useCustomToast from "@/hooks/useCustomToast";
import useCurrentStep from "@/hooks/useCurrentStep";
import StepFooter from "../ContinueButton";
import { Icon } from "@iconify/react";
interface PlanTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlanTripModal: React.FC<PlanTripModalProps> = ({ isOpen, onClose }) => {
  const toast = useCustomToast();

  const { handleSubmit, trigger } = useFormContext();
  const { address } = useContext(AppContext);
  const onSubmit = async (values: FieldValues) => {};
  const { currentStep, setCurrentStep, setSteps, steps } = useCurrentStep();
  const handleContinue = async () => {
    if (currentStep.stepNumber === 0) {
      if (!address) return toast.info("Please choose your location");
    } else if (currentStep.stepNumber === 1) {
      const isValid = await trigger(["nationality"]);
      if (!isValid) return;
    }
    setCurrentStep(steps[currentStep.stepNumber + 1]);
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
            {currentStep.stepNumber !== 0 && (
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
                {steps.slice(1)?.map((step, index) => (
                  <Flex
                    key={index}
                    align="center"
                    onClick={() => setCurrentStep(step)}
                    cursor="pointer"
                    gap={{ base: "1.5rem", md: "1.82rem" }}
                  >
                    <Circle
                      color={
                        currentStep.stepNumber === step.stepNumber
                          ? "light"
                          : "black"
                      }
                      size="35px"
                      bg={
                        currentStep.stepNumber === step.stepNumber
                          ? "primary"
                          : "transparent"
                      }
                      borderColor={"primary"}
                      borderWidth="1px"
                    >
                      <Icon icon={step.iconName} fontSize={20} />
                    </Circle>
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
                ))}
              </VStack>
            )}
            <Box flex="1">
              <form onSubmit={handleSubmit(onSubmit)}>
                <currentStep.component />
                <StepFooter onContinue={handleContinue} />
              </form>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlanTripModal;
