import React, { useState } from 'react';

interface Step {
    stepNumber: number;
    component: React.ReactNode;
}

const initialSteps: Step[] = [
    {
        stepNumber: 0,
        component: <h1>Hello World</h1>


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
