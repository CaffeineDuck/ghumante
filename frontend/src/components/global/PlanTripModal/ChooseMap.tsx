import AppContext from "@/context/AppContext";
import { useTripContext } from "@/context/TripContext";
import { Box, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import StepFooter from "../StepFooter";
import Map from "../Map";

const ChooseMap: React.FC = () => {
  const { setCoOrdinates, setAddress } = useContext(AppContext);

  const { gotoNextPage } = useTripContext();

  return (
    <Box>
      <Text as="h3" fontSize="1.4rem" fontWeight="semibold" mb="1rem">
        Choose your location
      </Text>
      <Map
        searchReadOnly={false}
        searchBoxFromTop="10px"
        height="400px"
        width="100%"
        setCoOrdinates={setCoOrdinates}
        setAddress={setAddress}
      />
      <StepFooter
        onContinue={() => {
          gotoNextPage();
        }}
      />
    </Box>
  );
};

export default ChooseMap;
