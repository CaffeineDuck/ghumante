import { axiosInstance } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";

const useGetDestination = () => {
  const [destinations, setDestinations] = useState<DestinationInterface[]>([]);
  const fetchDestination = async () => {
    try {
      const response = await axiosInstance.get("/api/destination");
      const mappedData = response.data?.features?.map(
        (item: CommonObjectResponse) => ({
          id: item.id,
          geometry: item.geometry,
          ...item.properties,
        })
      );
      setDestinations(mappedData);
    } catch (e) {}
  };
  useEffect(() => {
    fetchDestination();
  }, []);
  return { destinations };
};

export default useGetDestination;
