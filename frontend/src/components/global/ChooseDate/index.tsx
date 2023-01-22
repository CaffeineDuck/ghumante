import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InputField from "../FormElements/InputField";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import { Icon } from "@iconify/react";
import StepFooter from "../StepFooter";
import { useTripContext } from "@/context/TripContext";
import CustomSelect from "../FormElements/CustomSelect";
import { nationalities } from "@/sampleData/nationalities";

const moment = extendMoment(originalMoment as any);
const ChooseDate: React.FC = () => {
  const {
    gotoNextPage,
    setArrivalDateTime,
    setDepartureDateTime,
    setTotalHours,
  } = useTripContext();
  const today = moment();
  const [calendar, setCalender] = useState({
    dates: null,
    value: moment.range(
      today.clone().startOf("week"),
      today.clone().endOf("week")
    ),
    states: "",
    initialYear: new Date().getFullYear(),
    initialMonths: new Date().getMonth(),
    minimumDate: new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
    maximumDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
    start: moment
      .range(today.clone().startOf("week"), today.clone().endOf("week"))
      .start.format("YYYY-MM-DD"),
    end: moment
      .range(today.clone().startOf("week"), today.clone().endOf("week"))
      .end.format("YYYY-MM-DD"),
    showNewMonth: false,
  });
  const stateDefinitions: any = {
    available: {
      color: null,
      label: "Available",
    },
    enquire: {
      color: "#ffd200",
      label: "Enquire",
    },
    unavailable: {
      color: "#ff80ff",
      label: "Unavailable",
    },
  };
  const dateRangePickerSelect = (
    range: any,
    states: any,
    dates: any,
    start: any,
    end: any,
    value: any
  ) => {
    let obj: any = {
      start: moment(range.start.format()).startOf("week"),
      end: moment(range.end.format()).endOf("week"),
    };
    obj = moment.range(obj.start.format(), obj.end.format());
    setCalender({
      ...calendar,
      value: obj,
      states: states,
      start: obj.start.format("YYYY-MM-DD"),
      end: obj.end.format("YYYY-MM-DD"),
      showNewMonth: false,
    });
  };
  return (
    <Box>
      <Text fontSize="1.3rem" as="h4">
        Choose Nationality & Date ranges
      </Text>
      <Box my="2rem">
        <CustomSelect
          name="nationality"
          margin="0"
          options={nationalities.map((item) => ({ label: item, value: item }))}
          label="Nationality"
          placeholder="Choose nationality"
          validateOptions={{ required: "Nationality is requried" }}
        />
        <FormControl m="1rem 0">
          <FormLabel
            fontSize={{ base: "14px", md: "16px", xl: "18px" }}
            mb="0.625rem"
            fontWeight="400"
            color={"#000000"}
          >
            Choose range
          </FormLabel>

          <InputGroup>
            <Input
              h="54px"
              fontSize="1rem"
              fontWeight="400"
              focusBorderColor="primary"
              _hover={{ borderColor: "primary" }}
              _placeholder={{ color: "#2B2B2B", opacity: 0.55 }}
              w="full"
              // py="20px"
              bg="bgInput"
              px="13px"
              borderRadius="0.656rem"
              borderColor="inputBorder"
              min={0}
              borderWidth="1px"
              type="text"
              _autofill={{ bg: "bgInput" }}
              isRequired={false}
              value={`${calendar.start} - ${calendar.end}`}
              readOnly
              onClick={() => setCalender({ ...calendar, showNewMonth: true })}
              autoComplete="off"
            />

            <InputRightElement h="full" p="2" cursor="pointer">
              <Icon fontSize="1.2rem" icon="uit:calender" />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {calendar.showNewMonth && (
          <DateRangePicker
            selectionType="range"
            singleDateRange
            initialFromValue
            stateDefinitions={stateDefinitions}
            // dateStates={[]}
            defaultState="available"
            value={calendar.value}
            onSelect={dateRangePickerSelect as any}
            numberOfCalendars={2}
            initialMonth={calendar.initialMonths}
            initialYear={calendar.initialYear}
            minimumDate={calendar.minimumDate}
            maximumDate={calendar.maximumDate}
          />
        )}
      </Box>
      <StepFooter
        onContinue={() => {
          let startDateTime = calendar.start;
          let endDateTime = calendar.end;

          // use momentjs to subtract end date from start date
          //
          let hours = moment(endDateTime).diff(moment(startDateTime), "hours");
          setTotalHours(hours);

          setArrivalDateTime(startDateTime);
          setDepartureDateTime(endDateTime);

          gotoNextPage();
        }}
      />
    </Box>
  );
};

export default ChooseDate;
