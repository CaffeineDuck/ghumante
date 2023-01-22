import { axiosInstance } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";

const useGetHotels = (params: IParams) => {
  const [hotels, setHotels] = useState<HotelInterface[]>([]);
  const fetchHotels = async () => {
    try {
      const response = await axiosInstance.get("/api/hotel", { params });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.x, params.y]);
  return { hotels };
};

export default useGetHotels;
