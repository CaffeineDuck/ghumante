import ChooseActivities from "@/components/global/ChooseActivities";
import ChooseDate from "@/components/global/ChooseDate";
import ChooseHotel from "@/components/global/ChooseHotel";
import ChooseMap from "@/components/global/PlanTripModal/ChooseMap";
import SumamryDetails from "@/components/global/SummaryDetails";
import useCustomToast from "@/hooks/useCustomToast";
import React, { useContext, createContext, useState } from "react";

export interface Step {
  stepNumber: number;
  component?: React.FC | any;
  enabled: boolean;
  iconName: string;
  label: string;
  showSidebar: boolean;
  showInSidebar: boolean;
  tripInfo?: DestinationInterface | HotelInterface;
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
  {
    stepNumber: 3,
    enabled: true,
    component: ChooseHotel,
    iconName: "ri:hotel-line",
    label: "Choose Hotel",
    showSidebar: true,
    showInSidebar: true,
  },
  {
    stepNumber: 4,
    enabled: false,
    component: SumamryDetails,
    iconName: "carbon:order-details",
    label: "Summary",
    showSidebar: true,
    showInSidebar: true,
  },
];

export interface ITripContext {
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
  totalHours: number;
  setTotalHours: React.Dispatch<React.SetStateAction<number>>;
  occupiedHours: number;
  setOccupiedHours: React.Dispatch<React.SetStateAction<number>>;
}

const defaultTripContext: ITripContext = {
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
  totalHours: 0,
  setTotalHours: () => {},

  occupiedHours: 0,
  setOccupiedHours: () => {},
};

const TripContext = createContext<ITripContext>({
  ...defaultTripContext,
});

export const TripContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toast = useCustomToast();
  const [currentStep, setCurrentStep] = useState<Step>(
    defaultTripContext.currentStep
  );
  const [steps, setSteps] = useState<Step[]>(defaultTripContext.steps);

  const [arrivalDateTime, setArrivalDateTime] = useState<string | null>(null);
  const [departureDateTime, setDepartureDateTime] = useState<string | null>(
    null
  );

  const [totalHours, setTotalHours] = useState<number>(0);
  const [occupiedHours, setOccupiedHours] = useState<number>(0);

  const gotoNextPage = () => {
    const nextStep = steps.find(
      (step) => step.stepNumber === currentStep.stepNumber + 1
    );
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  const addStep = (step: Step) => {
    if (step.tripInfo) {
      const stepFound = steps.find((x) => x.tripInfo?.id == step.tripInfo?.id);
      if (stepFound) {
        return;
      }
    }

    const offset = currentStep.stepNumber === 3 ? 1 : 2;

    const newSteps = [...steps];
    step.stepNumber = newSteps.length;
    newSteps.splice(newSteps.length - offset, 0, step);
    setSteps(newSteps);
    toast.success(`${step.tripInfo?.name} is selected`);
  };

  return (
    <TripContext.Provider
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
        totalHours,
        setTotalHours,

        occupiedHours,
        setOccupiedHours,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => {
  return useContext(TripContext);
};
