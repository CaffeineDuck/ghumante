import DestinationCard from "@/components/nearby/DestinationCard";
import AppContext from "@/context/AppContext";
import { useTripContext } from "@/context/TripContext";
import useGetDestinationCategories from "@/hooks/useGetDestinationCategories";
import { axiosInstance } from "@/utils/axiosInstance";
import {
  Box,
  Flex,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useContext, useEffect, useState } from "react";
import StepFooter from "./StepFooter";

const ChooseHotel: React.FC = () => {
  const { destinationCategories } = useGetDestinationCategories();
  const { coOrdinates } = useContext(AppContext);
  const { steps, setCurrentStep } = useTripContext();
  const [destinations, setDestinations] = useState<DestinationInterface[]>([]);
  const [choosedCategory, setChoosedCategory] =
    useState<DestinationCategoryInterface | null>(null);

  const fetchHotels = async () => {
    try {
      const response = await axiosInstance.get("/api/hotel", {
        params: {
          //TODO: Uncomment
          // x: coOrdinates.lat,
          // y: coOrdinates.long,
          range: 50,
        },
      });
      const mappedData = response.data?.results?.features?.map(
        (item: CommonObjectResponse) => ({
          id: item.id,
          geometry: item.geometry,
          ...item.properties,
        })
      );
      setDestinations(mappedData);
    } catch (e) {}
  };
  const handleContinue = () => {
    let summaryStep = steps.find((step) => step.stepNumber === 4);
    if (!summaryStep) return;
    setCurrentStep(summaryStep);
  };
  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <Box>
      <Text as="h4" fontSize="1.3rem">
        Choose Hotel
      </Text>
      <Flex mt="2rem" gap="2rem" alignItems="stretch">
        <Box flex={"1"}>
          <SimpleGrid spacingX="1rem" spacingY="1.5rem" columns={2}>
            {destinations?.map((destination, index) => (
              <DestinationCard destination={destination} as="div" key={index} />
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
      <StepFooter onContinue={handleContinue} />
    </Box>
  );
};

export default ChooseHotel;
