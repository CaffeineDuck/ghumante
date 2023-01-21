import axios from "axios";

// axios Instance
export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}`,
});
