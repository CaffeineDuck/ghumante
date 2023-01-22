import useGetDestinationCategories from "@/hooks/useGetDestinationCategories";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

const ChooseActivities: React.FC = () => {
  const { destinationCategories } = useGetDestinationCategories();
  const [choosedCategory, setChoosedCategory] = useState<number | null>(null);
  useEffect(() => {
    if (choosedCategory) {
    }
  }, [choosedCategory]);
  return (
    <Box>
      <Text as="h4" fontSize="1.3rem">
        Choose Activities
      </Text>
      <Flex mt="2rem" flexWrap="wrap" gap="1rem">
        {destinationCategories?.map((item, index) => (
          <Box
            key={index}
            bg="light"
            px="1.5rem"
            py="0.5rem"
            borderColor="gray.200"
            cursor="pointer"
            borderWidth="1px"
            _hover={{ bg: "primary", color: "light", borderColor: "primary" }}
            borderRadius="lg"
            display="flex"
            gap="0.3rem"
            alignItems="center"
            transition="100ms ease-in"
            onClick={() => setChoosedCategory(item.id)}
          >
            <Icon icon="material-symbols:add" fontSize={20} />
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
    </Box>
  );
};

export default ChooseActivities;
