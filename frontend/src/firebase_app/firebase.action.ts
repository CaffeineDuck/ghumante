import {
  signInWithPhoneNumber,
  ConfirmationResult,
  UserCredential,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "./firebase.config";

export const signInWithPhone = async (
  phoneNumber: string,
  appVerifier: RecaptchaVerifier
) => {
  try {
    const response: ConfirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );
    return { success: true, response, error: null };
  } catch (error: any) {
    appVerifier?.clear();
    return { success: false, response: null, error: error.code };
  }
};

export const otpVerification = async (
  code: string,
  confirmationResult: ConfirmationResult
) => {
  try {
    const response: UserCredential = await confirmationResult.confirm(code);
    const user = response.user;
    const token = await user.getIdToken();
    return { success: true, token, error: null };
  } catch (e: any) {
    return { success: false, token: null, error: e.code };
  }
};
