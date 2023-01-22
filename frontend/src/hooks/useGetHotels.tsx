import { axiosInstance } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";

const useGetHotels = () => {
  const [hotels, setHotels] = useState<HotelInterface[]>([]);
  const fetchHotels = async () => {
    try {
      const response = await axiosInstance.get("/api/hotel");
      const mappedData = response.data?.features?.map(
        (item: CommonObjectResponse) => ({
          id: item.id,
          geometry: item.geometry,
          ...item.properties,
        })
      );
      setHotels(mappedData);
    } catch (e) {}
  };
  useEffect(() => {
    fetchHotels();
  }, []);
  return { hotels };
};

export default useGetHotels;
