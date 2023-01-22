import ImageCarousel from "@/components/global/ImageCarousel";
import Rating from "@/components/global/Rating";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Head from "next/head";
import React from "react";

const SingleNearByPage = () => {
  return (
    <Box>
      <Head>
        <title>Mattai Restaurant</title>
        <meta name="description" content="Single Product Title." />
      </Head>

      <Box pt={0}>
        <Container position="relative" maxW="container.xl" px={[2, 4]} pt={4}>
          <Grid
            templateColumns={[
              "minmax(0,auto)",
              "minmax(0,auto)",
              "minmax(0, 3fr) 2fr",
            ]}
            gap={[0, 4, 6]}
          >
            <Stack
              position={["relative", "relative", "sticky"]}
              top="4"
              mt={4}
              height="min-content"
            >
              <ImageCarousel
                images={[
                  "https://img.olx.com.br/images/50/509193481673478.jpg",
                  "https://img.olx.com.br/images/50/505167365537533.jpg",
                  "https://img.olx.com.br/images/50/501177121104088.jpg",
                  "https://img.olx.com.br/images/50/504102247685480.jpg",
                  "https://img.olx.com.br/images/50/500120243101489.jpg",
                ]}
              />
            </Stack>
            <Stack pt={[4, 4, 0]}>
              <Flex align="center"></Flex>
              <Text as="h2" fontSize={["xl", "xl", "2xl"]} fontWeight="600">
                Beautiful house in Kathmandu
              </Text>

              <Flex justify="space-between">
                <Flex align="center">
                  <Rating rating={3.5} />
                  <Text fontSize={["xs", "sm"]} ml={1}>
                    61 reviews
                  </Text>
                </Flex>
                <Text fontSize="sm" as="span" mt={0}>
                  Posted on 11/2018
                </Text>
              </Flex>

              <Heading size="lg" fontWeight="500">
                Rs 160
              </Heading>
              <Heading size="sm" pt={2}>
                Description
              </Heading>
              <Text fontSize={["sm", "md"]}>
                House consisting of 2 bedrooms, living room, kitchen and
                bathroom, large area in front, two aedicule in the back with
                bathroom and garden. For just 140 thousand and take the rest of
                the installments that are 497 declining. I accept automatic car
                as part of the deal. Whatsapp68992039107
              </Text>

              <Heading size="sm" pt={2}>
                Share
              </Heading>
              <Flex>
                <IconButton
                  ml={1}
                  fontSize={["md", "lg"]}
                  colorScheme="facebook"
                  aria-label="Facebook"
                  icon={<Icon icon="ic:baseline-facebook" />}
                />
                <IconButton
                  ml={1}
                  fontSize={["md", "lg"]}
                  colorScheme="twitter"
                  aria-label="Twitter"
                  icon={<Icon icon="mdi:twitter" />}
                />
              </Flex>

              <Heading size="sm" pt={2}>
                Pricing Details
              </Heading>
              <Table>
                <Tbody>
                  <TableRow label="Price" value="Rs 75000" />
                  <TableRow label="Price Negotiable:" value="Fixed Price" />
                  <TableRow label="Condition" value="Like New" />
                  <TableRow label="Used For (year or month)" value="2 months" />
                  <TableRow label="Type" value="Mirrorless" />
                </Tbody>
              </Table>

              <Heading size="sm" pt={2}>
                Delivery and Wrarranty Details
              </Heading>
              <Table>
                <Tbody>
                  <TableRow label="Home Delivery" value="Yes" />
                  <TableRow label="Delivery Area" value="Within My Country" />
                  <TableRow label="Warranty Type" value="No Warranty" />
                </Tbody>
              </Table>

              <HStack spacing={2} pt={2}>
                <Button w="full" variant="solid">
                  <Icon icon="material-symbols:bookmark-outline" /> Add to
                  WhishList
                </Button>
                <Button w="full" variant="solid" ml={1}>
                  <Icon icon="material-symbols:call" /> Call Now
                </Button>
              </HStack>
            </Stack>
          </Grid>

          <Stack my={4}>
            <Flex justify="space-between" align="center">
              <Heading size="md"> Similar Ads</Heading>
              <Text>View All</Text>
            </Flex>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default SingleNearByPage;

function TableRow({ label, value }: any) {
  return (
    <Tr>
      <Td fontWeight="500">{label}</Td>
      <Td>{value}</Td>
    </Tr>
  );
}
