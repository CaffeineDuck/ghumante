import InputField from "@/components/global/FormElements/InputField";
import { getAppVerifier } from "@/utils/firebaseAuth";
import { Box, Button, Text } from "@chakra-ui/react";
import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {
  otpVerification,
  signInWithPhone,
} from "@/firebase_app/firebase.action";
import { useRouter } from "next/router";
import OTPInput from "@/components/global/FormElements/OTPInput";
import { axiosInstance } from "@/utils/axiosInstance";
const LoginPage = () => {
  const router = useRouter();
  const method = useForm({ mode: "all" });
  const [currentView, setCurrentView] = useState<"phone" | "otp">("phone");
  const [verifyingRecaptcha, setVerifyingRecaptcha] = useState<boolean>(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>({} as ConfirmationResult);
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
  } = method;
  const phone = watch("phone");
  const otp = watch("otp");

  const submitOTP = async (code: string) => {
    try {
      const { success, token, error } = await otpVerification(
        code,
        confirmationResult
      );
      const response = await axiosInstance.post(
        "/auth/login",
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (e) {
    } finally {
    }
  };
  const onSubmit = async (values: FieldValues) => {
    if (currentView === "otp") {
      return submitOTP(otp);
    }
    setVerifyingRecaptcha(true);
  };
  const renderCorrectInput = () => {
    if (currentView === "otp") {
      return (
        <OTPInput
          length={6}
          label="Enter OTP"
          margin="0"
          name="otp"
          onComplete={submitOTP}
        />
      );
    } else if (currentView === "phone")
      return (
        <InputField
          name="phone"
          margin="1rem 0"
          label="Enter Phone"
          placeholder={"98********"}
          type="text"
        />
      );
  };
  useEffect(() => {
    if (!verifyingRecaptcha) return;
    const verifyRecaptcha = async () => {
      try {
        const appVerifier: RecaptchaVerifier = getAppVerifier(
          "recaptcha-container"
        );
        const { success, response, error } = await signInWithPhone(
          `+977${phone}`,
          appVerifier
        );
        if (success) {
          setConfirmationResult(response as ConfirmationResult);
          setCurrentView("otp");
        } else {
          sessionStorage.removeItem("userPhone");
        }
      } catch (e) {
      } finally {
        setVerifyingRecaptcha(false);
        reset();
      }
    };
    verifyRecaptcha();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyingRecaptcha]);

  return (
    <Box maxW="2xl" bg="light" mx="auto" my="3rem" borderRadius="lg" p="3rem">
      <Text fontSize="2rem" fontWeight="bold" my="2rem" textAlign="center">
        Login to{" "}
        <Text as="span" color="primary">
          Ghumante
        </Text>
      </Text>
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderCorrectInput()}
          {verifyingRecaptcha && <div id="recaptcha-container"></div>}
          <Button
            mt="2rem"
            w="full"
            borderRadius="lg"
            h="4rem"
            bg="primary"
            color="light"
            _hover={{ bg: "primaryHover" }}
            type="submit"
            isLoading={isSubmitting || verifyingRecaptcha}
          >
            Submit
          </Button>
        </form>
      </FormProvider>
      {currentView === "otp" && (
        <Box mt="0.8rem">
          <Button
            variant="link"
            as="span"
            cursor="pointer"
            onClick={() => setCurrentView("phone")}
            color="primary"
          >
            Change Number
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LoginPage;
