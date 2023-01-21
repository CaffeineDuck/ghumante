import SectionTitle from "@/components/global/SectionTitle";
import { howItWorks } from "@/sampleData/howItWorks";
import { Box, chakra, Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React from "react";
const ChakraIcon = chakra(Icon);
const HowItWorks = () => {
  return (
    <Box my="6rem">
      <SectionTitle>How it works</SectionTitle>
      <SimpleGrid mt="3rem" columns={{ base: 1, md: 3 }} spacing={10}>
        {howItWorks.map(({ title, description, icon }, index) => (
          <Feature
            key={index}
            icon={<ChakraIcon icon={icon} w={10} h={10} />}
            title={title}
            text={description}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HowItWorks;

const Feature = ({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: JSX.Element;
}) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={"semibold"}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};
