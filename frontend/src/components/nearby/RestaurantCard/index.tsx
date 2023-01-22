import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";
import { mapUrl } from "@/utils/mapUrl";
import Link from "next/link";
const RestaurantCard: React.FC<{ hotel: HotelInterface }> = ({ hotel }) => {
  return (
    <Box
      as={Link}
      cursor="pointer"
      role="group"
      borderRadius="lg"
      bg="light"
      overflow="hidden"
      _hover={{ shadow: "md" }}
      href={`/nearby/hotel-${hotel.id}`}
      legacyBehavior
    >
      <a>
        <Box pos="relative" h="10rem">
          <Image
            src={mapUrl(hotel?.photo)}
            layout="fill"
            alt="Hotel"
            objectFit="cover"
          />
        </Box>
        <Box p="0.7rem">
          <Text
            as="h3"
            isTruncated
            fontSize="1.2rem"
            fontWeight="semibold"
            _groupHover={{ color: "green.400" }}
          >
            {hotel?.name}
          </Text>
          <Text as="p" fontSize="0.8rem" color="gray.500" noOfLines={2}>
            {hotel?.description}
          </Text>
          <Stack direction="row" mt="0.5rem">
            <Flex
              w="fit-content"
              fontSize="0.9rem"
              color="gray.600"
              align="center"
              gap="0.2rem"
            >
              <Box as="span" w="1.5rem">
                <Icon icon="ph:map-pin-fill" />
              </Box>
              <Text as="span" wordBreak="break-all" noOfLines={1}>
                {hotel.location_name}
              </Text>
            </Flex>
            {/* <Flex
            w="fit-content"
            fontSize="0.9rem"
            color="gray.600"
            align="center"
            gap="0.2rem"
          >
            <Icon icon="material-symbols:star-rounded" />
            <Text as="span">4.0</Text>
          </Flex> */}
          </Stack>
        </Box>
      </a>
    </Box>
  );
};

export default RestaurantCard;
