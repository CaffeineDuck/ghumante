import { Circle } from '@chakra-ui/react';
import { Icon } from "@iconify/react";

interface ColorChangingCircleProps {
    currentStepNumber: number;
    stepNumber: number;
    iconName: string;

}

export const ColorChangingCircle: React.FC<ColorChangingCircleProps> = (
    {
        currentStepNumber,
        stepNumber,
        iconName
    }
) => {
    return <Circle
        color={
            currentStepNumber === stepNumber
                ? "light"
                : "gray.400"
        }
        size="35px"
        bg={
            currentStepNumber === stepNumber
                ? "primary"
                : "transparent"
        }
        borderColor={
            currentStepNumber === stepNumber
                ? "primary"
                : "gray.300"
        }
        borderWidth="1px"
    >
        <Icon icon={iconName} fontSize={20} />
    </Circle>
}