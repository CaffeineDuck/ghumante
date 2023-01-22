import React, { useState } from 'react';
import {Choose}

interface Step {
    stepNumber: number;
    component: React.ReactNode;
    enabled: boolean;
    iconName: string;
}

const initialSteps: Step[] = [
    {
        stepNumber: 0,
        enabled: true,
        component: <h1>Hello World</h1>,
        iconName: "la:plane-arrival"


    }
]



const useStepper = () => {

    const [steps, setSteps] = useState<Step[]>(initialSteps);

    const [currentStep, setCurrentStep] = useState<Step>(
        steps[0]
    );


    return {
        steps,
        setSteps,
        currentStep,
        setCurrentStep,
    }


}
