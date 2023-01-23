import { useTripContext } from "@/context/TripContext";
import useCustomToast from "@/hooks/useCustomToast";
import { axiosInstance } from "@/utils/axiosInstance";
import { getStorage } from "@/utils/storage";
import { parseTime } from "@/utils/time";
import {
  Box,
  Flex,
  ListIcon,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import StepFooter from "../StepFooter";

const SumamryDetails: React.FC = () => {
  const { steps, arrivalDateTime, departureDateTime, totalHours } =
    useTripContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useCustomToast();
  const { dest, hotel } = useMemo(() => {
    const dest = steps.filter((step) => step?.tripInfo?.category);
    const hotel = steps.find(
      (step) => step?.tripInfo && !step?.tripInfo?.category
    );
    return { dest, hotel };
  }, [steps]);
  const usedHours = useMemo(() => {
    if (!dest) return 0;
    return dest.reduce((acc, cur) => {
      acc += cur.tripInfo?.visiting_time;
      return acc;
    }, 0);
  }, [dest]);
  const { getValues } = useFormContext();
  const amount =
    (Number(hotel?.tripInfo?.price_per_night) * (totalHours / 24)) / 2;
  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/localtrip",
        {
          content: steps,
        },
        {
          headers: {
            Authorization: `Bearer ${getStorage("X-Access-Token")}`,
          },
        }
      );
      toast.success("Success. Thanks for choosing us. Enjoy your trip.");
    } catch (e) {
      toast.error("Failed to create trip");
    }
  };
  return (
    <Box>
      <Text as="h4" fontSize="1.3rem" display="flex" alignItems="center">
        Your activities summary
      </Text>
      <Box mt="2rem">
        <VStack align="flex-start" spacing="2rem">
          <Box>
            <Text as="h3" fontSize="1.1rem" color="gray.500">
              Schedule
            </Text>
            <Text as="p">
              {moment(arrivalDateTime).format("MMM D, YYYY")} -{" "}
              {moment(departureDateTime).format("MMM D, YYYY")}{" "}
            </Text>
          </Box>
          <Box mt="2rem">
            <Text as="h3" fontSize="1.1rem" color="gray.500">
              Nationality
            </Text>
            <Text as="p">{getValues("nationality")}</Text>
          </Box>
          <Box mt="2rem">
            <Text as="h3" fontSize="1.1rem" color="gray.500">
              Destinations
            </Text>
            <VStack mt="0.5rem" spacing="0.5rem" align="flex-start">
              {dest?.map((destination, index) => (
                <Flex
                  key={index}
                  gap="0.5rem"
                  align="center"
                  fontSize="1rem"
                  color="gray.500"
                >
                  <Box as="span" w="1.5rem">
                    <Icon
                      icon="material-symbols:check-circle-outline"
                      color="green"
                      fontSize="1.1rem"
                    />
                  </Box>
                  <Text color="black" fontSize="1rem">
                    {destination?.tripInfo?.name} -{" "}
                    <Text as="span" fontSize="sm" opacity="0.5">
                      {parseTime(destination?.tripInfo?.visiting_time)} for
                      visiting
                    </Text>
                  </Text>
                </Flex>
              ))}
            </VStack>
          </Box>
          <Box mt="2rem">
            <Text as="h3" fontSize="1.1rem" color="gray.500">
              Hotel
            </Text>
            <Flex gap="0.3rem" align="center" fontSize="1rem" color="gray.500">
              <Box as="span" w="1.5rem">
                <Icon
                  icon="material-symbols:check-circle-outline"
                  color="green"
                  fontSize="1.1rem"
                />
              </Box>
              <Text color="black" fontSize="1rem">
                {hotel?.tripInfo?.name} -{" "}
                <Text as="span" fontSize="sm" opacity="0.5">
                  Rs.{hotel?.tripInfo?.price_per_night} per night
                </Text>
              </Text>
            </Flex>
          </Box>
          <Box mt="2rem">
            <Text as="h3" fontSize="1.1rem" color="gray.500">
              Total hours you will be enjoying
            </Text>
            <Flex align="center" gap="1rem" fontSize="1rem" color="gray.500">
              <Box as="span" w="1.5rem">
                <Icon
                  icon="ic:outline-access-time"
                  color="green"
                  fontSize="2rem"
                />
              </Box>
              <Text color="black" fontSize="2rem">
                {totalHours} hours - {parseTime(usedHours)}{" "}
                <Text opacity="0.5" fontSize="xl" as="span">
                  will be spent
                </Text>
              </Text>
            </Flex>
          </Box>
          <Box mt="2rem">
            <Text as="h3" fontSize="1.1rem" color="gray.500">
              Expected Expenditure
            </Text>
            <Flex gap="1rem" align="center" fontSize="1rem" color="gray.500">
              <Box as="span" w="1.5rem">
                <Icon
                  icon="heroicons-outline:cash"
                  color="green"
                  fontSize="2rem"
                />
              </Box>
              <Text color="black" fontSize="2rem">
                Rs {amount}
              </Text>
            </Flex>
          </Box>
        </VStack>
      </Box>
      {/* <StepFooter
        onContinue={handleSubmit}
        loading={isLoading}
        buttonTxt={`Pay Rs. ${amount.toFixed(2)}`}
      /> */}
    </Box>
  );
};

export default SumamryDetails;
