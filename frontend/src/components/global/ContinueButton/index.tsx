import { Button, Flex } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React from "react";

const StepFooter: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  return (
    <Flex justify="end" mt="4rem">
      <Button
        variant={"solid"}
        colorScheme={"primaryScheme"}
        size={"lg"}
        onClick={onContinue}
        rightIcon={
          <Icon fontSize={18} icon="material-symbols:arrow-right-alt" />
        }
      >
        Continue
      </Button>
    </Flex>
  );
};

export default StepFooter;
