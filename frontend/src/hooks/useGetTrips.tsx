import { axiosInstance } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";

const useGetTrips = () => {
  const [trips, setTrips] = useState<TripInterface[]>([]);
  const fetchTrips = async () => {
    try {
      const response = await axiosInstance.get("/api/localtrip");
      const mappedData = response.data?.features?.map(
        (item: CommonObjectResponse) => ({
          id: item.id,
          geometry: item.geometry,
          ...item.properties,
        })
      );
      setTrips(mappedData);
    } catch (e) {}
  };
  useEffect(() => {
    fetchTrips();
  }, []);
  return { trips };
};

export default useGetTrips;
