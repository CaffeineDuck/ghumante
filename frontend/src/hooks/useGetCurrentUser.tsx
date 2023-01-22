import { axiosInstance } from "@/utils/axiosInstance";
import { getStorage } from "@/utils/storage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useGetCurrentUser = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const fetchUser = async (token: string) => {
    try {
      const response = await axiosInstance.get("/auth/user", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUser(response.data);
    } catch (e) {
      setUser(null);
    }
  };
  useEffect(() => {
    const token = getStorage("X-Access-Token");
    if (token) {
      fetchUser(token);
    }
  }, [router]);
  return { user };
};

export default useGetCurrentUser;
