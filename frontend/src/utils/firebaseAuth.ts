import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "src/firebase_app/firebase.config";
export const getAppVerifier = (containerId: string): RecaptchaVerifier => {
  return new RecaptchaVerifier(
    containerId,
    {
      size: "invisible",
      callback: (response: any) => {},
      "expired-callback": () => {},
    },
    auth
  );
};
