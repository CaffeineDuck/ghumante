import useGetDestinationCategories from "@/hooks/useGetDestinationCategories";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const ChooseActivities: React.FC = () => {
  const { destinationCategories } = useGetDestinationCategories();
  console.log(destinationCategories);
  return (
    <Box>
      <Text as="h4" fontSize="1.3rem">
        Choose Activities
      </Text>
      <Flex mt="2rem">
        {destinationCategories?.map((item, index) => (
          <Box key={index} px="1" py="1.1rem" borderRadius="lg">
            <Text as="h4" fontSize="1.1rem" fontWeight="semibold">
              {item.name}
            </Text>
            <Text as="p">{item.description}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default ChooseActivities;
