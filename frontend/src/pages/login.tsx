import InputField from "@/components/global/FormElements/InputField";
import { getAppVerifier } from "@/utils/firebaseAuth";
import { Box, Button } from "@chakra-ui/react";
import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {
  otpVerification,
  signInWithPhone,
} from "@/firebase_app/firebase.action";
import { useRouter } from "next/router";
import OTPInput from "@/components/global/FormElements/OTPInput";
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

  const submitOTP = async () => {
    try {
      const { success, token, error } = await otpVerification(
        otp,
        confirmationResult
      );
      console.log(token);
    } catch (e) {
    } finally {
    }
  };
  const onSubmit = async (values: FieldValues) => {
    if (currentView === "otp") {
      return submitOTP();
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
          name="input"
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
    <Box maxW="4xl" mx="auto" my="3rem">
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderCorrectInput()}
          {verifyingRecaptcha && <div id="recaptcha-container"></div>}
          <Button
            w="full"
            bg="primary"
            color="light"
            _hover={{ bg: "primaryHover" }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};

export default LoginPage;
