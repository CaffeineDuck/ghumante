import { getStorage } from "@/utils/storage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useGetCurrentUser = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  // const fetchUser = async () => {
  //   try {
  //     const response = await currentUser();
  //     console.log(response.data);
  //     setUser(response.data?.user);
  //   } catch (e) {
  //     setUser(null);
  //   }
  // };
  useEffect(() => {
    const token = getStorage("X-Access-Token");
    if (token) {
      fetchUser();
    }
  }, [router]);
  return { user };
};

export default useGetCurrentUser;
