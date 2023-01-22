import React, { useState } from 'react';

interface Step {
    stepNumber: number;
    component: React.ReactNode;
}

const steps: Step[] = [
    {
        stepNumber: 0,
        component: <h1>Hello World</h1>


    }
]

const findStep = (stepNumber: number) => {
    return steps.find(step => step.stepNumber === stepNumber);
}


const useStepper = () => {

    const [currentStep, setCurrentStep] = useState<Step>(
        findStep(0)!
    );

    return [currentStep, setCurrentStep];



}
