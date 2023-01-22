import ChooseMap from "@/components/global/PlanTripModal/ChooseMap";
import { Flex , Button, Icon} from "@chakra-ui/react";
import React, { useState } from "react";

interface Step {
  stepNumber: number;
  component: React.FC
  enabled: boolean;
  iconName: string;
  label: string;
}


interface NextPageComponentProps  {
  handleContinue: () => void;
}

const NextPageComponent: React.FC<NextPageComponentProps> = ({handleContinue}) => {
  return (<Flex justify="end" mt="4rem">
  <Button
    variant={"solid"}
    colorScheme={"primaryScheme"}
    size={"lg"}
    onClick={handleContinue}
    rightIcon={
      <Icon
        fontSize={18}
        icon="material-symbols:arrow-right-alt"
      />
    }
  >
    Continue
  </Button>
</Flex>)
}

const useCurrentStep = () => {
  const initialSteps: Step[] = [
    {
      stepNumber: 0,
      enabled: true,
      component: ChooseMap,
      iconName: "la:plane-arrival",
      label: "Choose Map",
    },
    {
      stepNumber: 1,
      enabled: true,
      component: ChooseMap,
      iconName: "la:plane-arrival",
      label: "Choose Map",
    },
    {
      stepNumber: 2,
      enabled: true,
      component: ChooseMap,
      iconName: "la:plane-arrival",
      label: "Choose Map",
    },
  ];
  const [steps, setSteps] = useState<Step[]>(initialSteps);

  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);

  return {
    steps,
    setSteps,
    currentStep,
    setCurrentStep,
    nextPageComponent: NextPageComponent
  };
};
export default useCurrentStep;