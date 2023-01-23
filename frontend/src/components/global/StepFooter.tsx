import { useTripContext } from "@/context/TripContext";
import { Button, Flex } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React from "react";

const StepFooter: React.FC<{
  onContinue: () => void;
  buttonTxt?: string;
  loading?: boolean;
}> = ({ onContinue, buttonTxt, loading = false }) => {
  const { currentStep, setCurrentStep, steps } = useTripContext();
  return (
    <Flex
      // justify="flex-end"
      mt="4rem"
      gap={"5rem"}
      position="sticky"
      bottom="0"
      py="4"
      bg="white"
      zIndex={10}
      justify="center"
    >
      <Button
        variant={"solid"}
        colorScheme={"primaryScheme"}
        borderRadius="full"
        px="5rem"
        size={"lg"}
        isLoading={loading}
        onClick={onContinue}
        rightIcon={<Icon fontSize={18} icon="mdi:arrow-right" />}
      >
        {buttonTxt || "Continue"}
      </Button>
    </Flex>
  );
};

export default StepFooter;
