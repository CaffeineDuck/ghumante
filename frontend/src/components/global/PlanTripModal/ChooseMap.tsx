import AppContext from "@/context/AppContext";
import useCustomToast from "@/hooks/useCustomToast";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import Map from "../Map";

const ChooseMap: React.FC<{ handleContinue: () => void }> = ({
  handleContinue,
}) => {
  const { setCoOrdinates, setAddress, address } = useContext(AppContext);
  const toast = useCustomToast();
  return (
    <Box>
      <Text as="h3" fontSize="1.4rem" fontWeight="semibold" mb="1rem">
        Choose your location
      </Text>
      <Map
        searchReadOnly={false}
        searchBoxFromTop="5px"
        height="400px"
        width="100%"
        setCoOrdinates={setCoOrdinates}
        setAddress={setAddress}
      />
      <Flex justify="end" mt="4rem">
        <Button
          variant={"solid"}
          colorScheme={"primaryScheme"}
          size={"lg"}
          onClick={() => {
            if (!address) {
              return toast.info("Please choose your location");
            }
            handleContinue();
          }}
          rightIcon={
            <Icon fontSize={18} icon="material-symbols:arrow-right-alt" />
          }
        >
          Continue
        </Button>
      </Flex>
    </Box>
  );
};

export default ChooseMap;
