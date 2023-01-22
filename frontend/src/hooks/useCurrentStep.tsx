import ChooseActivities from "@/components/global/ChooseActivities";
import ChooseDate from "@/components/global/ChooseDate";
import ChooseMap from "@/components/global/PlanTripModal/ChooseMap";
import { Flex, Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

interface Step {
  stepNumber: number;
  component: React.FC;
  enabled: boolean;
  iconName: string;
  label: string;
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
      component: ChooseDate,
      iconName: "la:plane-arrival",
      label: "Choose Map",
    },
    {
      stepNumber: 2,
      enabled: true,
      component: ChooseActivities,
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
  };
};
export default useCurrentStep;
