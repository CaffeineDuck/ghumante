import { useToast, UseToastOptions } from "@chakra-ui/react";

const toastConfig: UseToastOptions = {
  variant: "solid",
  position: "top",
  orientation: "vertical",
};
const useCustomToast = () => {
  const toast = useToast();
  const success = (message: string) => {
    toast({ ...toastConfig, status: "success", description: message });
  };
  const error = (message: string) => {
    toast({ ...toastConfig, status: "error", description: message });
  };
  const info = (message: string) => {
    toast({ ...toastConfig, status: "info", description: message });
  };
  const warn = (message: string) => {
    toast({ ...toastConfig, status: "warning", description: message });
  };
  return { success, error, info, warn };
};

export default useCustomToast;
