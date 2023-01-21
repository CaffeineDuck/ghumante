import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { useFormContext } from "react-hook-form";
type inputProps = {
  type: string;
  placeholder?: string;
  margin: string;
  label?: string;
  rows?: number;
  name: string;
  validateOptions?: object;
  readOnly?: boolean;
  leftIcon?: string;
};
const InputField: React.FC<inputProps> = ({
  type,
  placeholder,
  margin,
  label,
  rows,
  name,
  validateOptions,
  readOnly,
  leftIcon,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [show, setShow] = useState<boolean>(false);
  const togglePassword = () => {
    setShow(!show);
  };

  return (
    <FormControl m={margin} isInvalid={!!errors[name]}>
      {label && (
        <FormLabel
          fontSize={{ base: "14px", md: "16px", xl: "18px" }}
          mb="0.625rem"
          fontWeight="400"
          color={"#000000"}
        >
          {label}
        </FormLabel>
      )}
      {type === "textarea" ? (
        <Textarea
          rows={rows}
          fontSize="1rem"
          fontWeight="400"
          focusBorderColor="primary"
          _placeholder={{ color: "#2B2B2B", opacity: 0.55 }}
          w="full"
          {...register(name, { ...validateOptions })}
          // py="20px"
          placeholder={placeholder ? placeholder : ""}
          px="13px"
          bg="#FAFAFB"
          borderColor="gray.300"
          _hover={{ borderColor: "primary" }}
          borderRadius="lg"
          border="1px solid #CDCDCD"
          autoComplete="off"
          isRequired={false}
          readOnly={readOnly}
        />
      ) : (
        <InputGroup>
          {leftIcon && (
            <InputLeftElement h="full" p="2">
              <Icon
                fontSize="1.2rem"
                icon={leftIcon}
                color="var(--chakra-colors-gray-2)"
              />
            </InputLeftElement>
          )}
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
            {...register(name, { ...validateOptions })}
            placeholder={placeholder ? placeholder : ""}
            px="13px"
            borderRadius="lg"
            borderColor="inputBorder"
            min={0}
            borderWidth="1px"
            type={type === "password" ? (show ? "text" : "password") : type}
            _autofill={{ bg: "bgInput" }}
            isRequired={false}
            autoComplete="off"
            readOnly={readOnly}
            onWheel={(event: any) => {
              event.target?.blur();
            }}
          />
          {type === "password" && (
            <InputRightElement
              h="full"
              p="2"
              cursor="pointer"
              onClick={togglePassword}
            >
              {show ? (
                <Icon fontSize="1.2rem" icon="akar-icons:eye-open" />
              ) : (
                <Icon fontSize="1.2rem" icon="akar-icons:eye-slashed" />
              )}
            </InputRightElement>
          )}
        </InputGroup>
      )}
      {errors[name] && (
        <Box h="10px" mt="5px">
          <Text color="error">
            <>{errors[name]?.message}</>
          </Text>
        </Box>
      )}
    </FormControl>
  );
};

export default InputField;
