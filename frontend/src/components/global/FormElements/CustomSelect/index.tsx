import { Box, Select, Text } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

type SelectProps = {
  placeholder?: string;
  margin: string;
  label?: string;
  name: string;
  validateOptions?: object;
  options: Array<{ value: string; label: string }>;
  readOnly?: boolean;
  disabled?: boolean;
};
const CustomSelect: React.FC<SelectProps> = ({
  placeholder,
  options,
  label,
  name,
  validateOptions,
  margin,
  readOnly,
  disabled,
}) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  return (
    <Box margin={margin}>
      {label && (
        <Text fontSize={{ base: "14px", md: "16px" }} mb="8px" color="#000000">
          {label}
        </Text>
      )}
      <Select
        fontSize={{ base: "14px", md: "16px" }}
        size="lg"
        w="full"
        h="54px"
        {...register(name, { ...validateOptions })}
        focusBorderColor="primary"
        placeholder={placeholder ? placeholder : ""}
        _placeholder={{ color: "rgba(0,0,0,0.3)" }}
        borderRadius="lg"
        borderColor={errors[name] ? "red" : "inputBorder"}
        isReadOnly={readOnly}
        _hover={{ borderColor: "primary" }}
        disabled={disabled}
        bg="#FAFAFB"
        _disabled={{ opacity: 0.9 }}
      >
        {options?.map(
          (option: { value: string; label: string }, index: number) => (
            <option
              key={index}
              value={option.value}
              selected={option.value === getValues(name)}
            >
              {option.label}
            </option>
          )
        )}
      </Select>
      <Box h="10px" mt="5px">
        {errors[name] && (
          <Text color="error">
            <>{errors[name]?.message}</>
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default CustomSelect;
