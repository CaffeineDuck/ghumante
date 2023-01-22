import Map from "@/components/global/Map";
import RestaurantCard from "@/components/nearby/RestaurantCard";
import useGetDestination from "@/hooks/useGetDestinations";
import useGetHotels from "@/hooks/useGetHotels";
import useGetTrips from "@/hooks/useGetTrips";
import {
  Box,
  Flex,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import Destination from "@/components/nearby/DestinationCard";
import AppContext from "@/context/AppContext";

const NearByPage = () => {
  const { trips } = useGetTrips();
  const { coOrdinates, setCoOrdinates } = useContext(AppContext);
  const { hotels } = useGetHotels({
    x: coOrdinates.lat,
    y: coOrdinates.long,
    range: 50,
  });
  const { destinations } = useGetDestination({
    x: coOrdinates.lat,
    y: coOrdinates.long,
    range: 50,
  });

  return (
    <Flex gap="2rem">
      <Box
        width="30rem"
        mt="1rem"
        maxH="80vh"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Tabs>
          <TabList position="sticky" zIndex={5} top="0rem" bg="bgColor">
            {["Hotels", "Local Trip"].map((item) => (
              <Tab
                fontSize="md"
                key={item}
                _selected={{ color: "primary", borderBottomColor: "primary" }}
              >
                {item}
              </Tab>
            ))}
          </TabList>

          <TabPanels mt="1rem">
            <TabPanel px="0">
              <Text as="h3" color="dark" fontSize="1.4rem">
                All hotels near you
              </Text>
              <SimpleGrid
                mt="1rem"
                spacingX="1rem"
                spacingY="1.5rem"
                columns={{ base: 1, md: 2 }}
              >
                {hotels &&
                  hotels?.map((hotel: HotelInterface, index) => (
                    <RestaurantCard hotel={hotel} key={index} />
                  ))}
              </SimpleGrid>
              {destinations.length === 0 && (
                <Text color="gray.600">No hotels found near you</Text>
              )}
            </TabPanel>
            <TabPanel px="0">
              <Text as="h3" color="dark" fontSize="1.4rem">
                All trips near you
              </Text>
              <SimpleGrid
                spacingX="1rem"
                mt="1rem"
                spacingY="1.5rem"
                columns={{ base: 1, md: 2 }}
              >
                {destinations.map((destination, index) => (
                  <Destination destination={destination} key={index} />
                ))}
              </SimpleGrid>
              {destinations.length === 0 && (
                <Text color="gray.600">No trips found near you</Text>
              )}
            </TabPanel>
            <TabPanel px="0">
              <Text as="h3" color="dark" fontSize="1.4rem">
                Cultural sites near you
              </Text>
              <SimpleGrid
                spacingX="1rem"
                spacingY="1.5rem"
                mt="1rem"
                columns={{ base: 1, md: 2 }}
              >
                {/* {[1, 2, 3, 4, 5].map((item, index) => (
                  <CulturalSite key={index} />
                ))} */}
              </SimpleGrid>
              {destinations.length === 0 && (
                <Text color="gray.600">No cultural sites found near you</Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box flex="1">
        <Map
          searchBoxFromTop="2rem"
          height="80vh"
          width="100%"
          searchReadOnly={false}
          askCurrentLocation={true}
          setCoOrdinates={setCoOrdinates}
        />
      </Box>
    </Flex>
  );
};

export default NearByPage;
