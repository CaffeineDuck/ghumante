import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
type inputProps = {
  length: number;
  margin: string;
  label?: string;
  name: string;
  validateOptions?: object;
  handleChange?: (code: string) => void;
  onComplete?: (code: string) => void;
};
const OTPInput: React.FC<inputProps> = ({
  length,
  margin,
  label,
  name,
  validateOptions,
  handleChange,
  onComplete,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [otp, setOTP] = useState<string>("");
  useEffect(() => {
    register(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register]);
  return (
    <FormControl m={margin} isInvalid={!!errors[name]}>
      {label && (
        <FormLabel
          fontSize={{ base: "14px", md: "16px", xl: "18px" }}
          mb="0.625rem"
          fontWeight="400"
          color={"dark"}
        >
          {label}
        </FormLabel>
      )}

      <HStack mt="1rem" justify="space-between">
        <PinInput
          autoFocus
          onChange={(val) => {
            setValue(name, val);
            setOTP(val);
            handleChange && handleChange(val);
          }}
          type="number"
          size="lg"
          value={otp}
          focusBorderColor="none"
          onComplete={(value) => onComplete && onComplete(value)}
        >
          {Array(length)
            .fill(1)
            .map((_, index) => (
              <PinInputField
                key={index}
                borderWidth="0 0 2px 0"
                h="3.75rem"
                w="4.31rem"
                fontSize="1.5rem"
                borderRadius="none"
                borderColor="gray.4"
                _hover={{ borderColor: "primary", borderWidth: "0 0 2px 0" }}
                _focus={{ borderColor: "primary", borderWidth: "0 0 2px 0" }}
              />
            ))}
        </PinInput>
      </HStack>

      {errors[name] && (
        <Box h="10px" mt="5px">
          <Text className="error">
            <>{errors[name]?.message}</>
          </Text>
        </Box>
      )}
    </FormControl>
  );
};

export default OTPInput;
