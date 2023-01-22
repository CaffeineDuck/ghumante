import AppContext from "@/context/AppContext";
import { Box, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import Map from "../Map";

const ChooseMap: React.FC = () => {
  const { setCoOrdinates, setAddress } = useContext(AppContext);

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
    </Box>
  );
};

export default ChooseMap;
