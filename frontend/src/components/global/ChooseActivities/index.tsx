import DestinationCard from "@/components/nearby/DestinationCard";
import AppContext from "@/context/AppContext";
import useGetDestinationCategories from "@/hooks/useGetDestinationCategories";
import { axiosInstance } from "@/utils/axiosInstance";
import { Box, Flex, SimpleGrid, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useContext, useEffect, useState } from "react";
import StepFooter from "../StepFooter";

const ChooseActivities: React.FC = () => {
  const { destinationCategories } = useGetDestinationCategories();
  const { coOrdinates } = useContext(AppContext);
  const [destinations, setDestinations] = useState<DestinationInterface[]>([]);
  const [choosedCategory, setChoosedCategory] =
    useState<DestinationCategoryInterface | null>(null);

  const fetchDestinations = async () => {
    try {
      const response = await axiosInstance.get("/api/destination", {
        params: {
          //TODO: Uncomment
          // x: coOrdinates.lat,
          // y: coOrdinates.long,
          range: 50,
          category: choosedCategory?.id,
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
  useEffect(() => {
    if (choosedCategory) {
      fetchDestinations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choosedCategory]);
  return (
    <Box>
      <Text as="h4" fontSize="1.3rem">
        Choose Activities{" "}
        {choosedCategory?.id && (
          <Flex
            w="fit-content"
            fontSize="0.9rem"
            color="gray.600"
            align="center"
            gap="0.2rem"
          >
            <Icon icon="tabler:chevron-right" />
            <Text as="span">{choosedCategory.name}</Text>
          </Flex>
        )}
      </Text>
      <Flex mt="2rem" gap="2rem" alignItems="stretch">
        <Flex
          flexWrap="wrap"
          maxW={!choosedCategory?.id ? "auto" : "15rem"}
          flexDir={!choosedCategory?.id ? "row" : "column"}
          gap="1rem"
        >
          {destinationCategories &&
            destinationCategories?.map((item, index) => (
              <Box
                key={index}
                bg={choosedCategory?.id === item.id ? "primary" : "light"}
                px="1.5rem"
                py="0.5rem"
                color={choosedCategory?.id === item.id ? "light" : "black"}
                borderColor="gray.200"
                cursor="pointer"
                borderWidth="1px"
                _hover={{
                  bg: "primary",
                  color: "light",
                  borderColor: "primary",
                }}
                borderRadius="lg"
                display="flex"
                gap="0.3rem"
                alignItems="center"
                transition="100ms ease-in"
                onClick={() => setChoosedCategory(item)}
              >
                <Icon
                  icon={
                    choosedCategory?.id === item.id
                      ? "icons8:checked"
                      : "material-symbols:add"
                  }
                  fontSize={20}
                />
                <Text
                  as="h4"
                  whiteSpace="nowrap"
                  fontSize="1.1rem"
                  fontWeight="semibold"
                >
                  {item.name}
                </Text>
              </Box>
            ))}
        </Flex>
        {choosedCategory?.id && (
          <Box flex={"1"}>
            <Text
              as="h3"
              fontSize="1.2rem"
              pb="0.5rem"
              borderBottomColor="gray.200"
              borderBottomWidth="1px"
            >
              Explore {choosedCategory.name}
            </Text>
            <SimpleGrid spacingX="1rem" spacingY="1.5rem" columns={2}>
              {destinations?.map((destination, index) => (
                <DestinationCard
                  destination={destination}
                  as="div"
                  key={index}
                />
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Flex>
      <StepFooter onContinue={() => {
      alert("HI")
      }} />
    </Box>
  );
};

export default ChooseActivities;
