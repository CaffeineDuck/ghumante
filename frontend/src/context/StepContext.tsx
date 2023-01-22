import ChooseActivities from "@/components/global/ChooseActivities";
import ChooseDate from "@/components/global/ChooseDate";
import ChooseMap from "@/components/global/PlanTripModal/ChooseMap";
import React, { useContext, createContext, useState } from "react";

export interface Step {
  stepNumber: number;
  component: React.FC;
  enabled: boolean;
  iconName: string;
  label: string;
  showSidebar: boolean;
  showInSidebar: boolean;
}

const initialSteps: Step[] = [
  {
    stepNumber: 0,
    enabled: true,
    component: ChooseMap,
    iconName: "la:plane-arrival",
    label: "Choose Map",
    showSidebar: false,
    showInSidebar: false,
  },
  {
    stepNumber: 1,
    enabled: true,
    component: ChooseDate,
    iconName: "la:plane-arrival",
    label: "Choose Date",
    showSidebar: false,
    showInSidebar: false,
  },
  {
    stepNumber: 2,
    enabled: true,
    component: ChooseActivities,
    iconName: "la:plane-arrival",
    label: "Choose Activities",
    showSidebar: true,
    showInSidebar: true,
  },
];

export interface IStepContext {
  arrivalDateTime: string | null;
  departureDateTime: string | null;
  setArrivalDateTime: React.Dispatch<React.SetStateAction<string | null>>;
  setDepartureDateTime: React.Dispatch<React.SetStateAction<string | null>>;
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
  gotoNextPage: () => void;
  addStep: (step: Step) => void;
  currentStep: Step;
}

const defaultStepContext: IStepContext = {
  steps: initialSteps,
  arrivalDateTime: null,
  departureDateTime: null,
  setArrivalDateTime: () => {},
  setDepartureDateTime: () => {},
  setSteps: () => {},
  setCurrentStep: () => {},
  gotoNextPage: () => {},
  currentStep: initialSteps[0],
  addStep: (step: Step) => {},
};

const StepContext = createContext<IStepContext>({
  ...defaultStepContext,
});

export const StepContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>(
    defaultStepContext.currentStep
  );
  const [steps, setSteps] = useState<Step[]>(defaultStepContext.steps);

  const [arrivalDateTime, setArrivalDateTime] = useState<string | null>(null);
  const [departureDateTime, setDepartureDateTime] = useState<string | null>(
    null
  );

  const gotoNextPage = () => {
    const nextStep = steps.find(
      (step) => step.stepNumber === currentStep.stepNumber + 1
    );
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  const addStep = (step: Step) => {
    const newSteps = [...steps];
    step.stepNumber = newSteps.length - 1;
    newSteps.splice(newSteps.length - 1, 0, step);
    setSteps(newSteps);
  };

  return (
    <StepContext.Provider
      value={{
        steps,
        arrivalDateTime,
        setArrivalDateTime,
        departureDateTime,
        setDepartureDateTime,
        setSteps,
        currentStep,
        setCurrentStep,
        addStep,
        gotoNextPage,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const useStepContext = () => {
  return useContext(StepContext);
};
