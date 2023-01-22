import { axiosInstance } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";

const useGetDestinations = (params: IParams) => {
  const [destinations, setDestinations] = useState<DestinationInterface[]>([]);
  const fetchDestination = async () => {
    // if (params.x === 0 || params.y === 0) return;
    try {
      const response = await axiosInstance.get(`/api/destination`, { params });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.x, params.y]);
  return { destinations };
};

export default useGetDestinations;
