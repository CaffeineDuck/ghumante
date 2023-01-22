import { useTripContext } from "@/context/TripContext";
import { Button, Flex } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React from "react";

const StepFooter: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  const { currentStep, setCurrentStep, steps } = useTripContext();
  return (
    <Flex justify="flex-end" mt="4rem" gap={"5rem"}>
      {/*      <Button
        variant={"solid"}
        colorScheme={"primaryScheme"}
        size={"lg"}
        onClick={() => {
          setCurrentStep(steps[currentStep.stepNumber - 1]);
        }}
        leftIcon={<Icon fontSize={18} icon="mdi:arrow-left" />}
      >
        Go Back.
      </Button> */}
      <Button
        variant={"solid"}
        colorScheme={"primaryScheme"}
        size={"lg"}
        onClick={onContinue}
        rightIcon={<Icon fontSize={18} icon="mdi:arrow-right" />}
      >
        Continue
      </Button>
    </Flex>
  );
};

export default StepFooter;
