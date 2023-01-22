import { axiosInstance } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";

const useGetByCategoryAndID = ({
  id,
  category,
}: {
  id: number;
  category: string;
}) => {
  const [item, setItem] = useState<
    DestinationInterface | HotelInterface | null
  >(null);
  const fetchDestination = async () => {
    // if (params.x === 0 || params.y === 0) return;
    try {
      const response = await axiosInstance.get(`/api/${category}/${id}`);
      const mappedData = {
        id: response?.data.id,
        geometry: response?.data.geometry,
        ...response?.data.properties,
      };
      setItem(mappedData);
    } catch (e) {}
  };
  useEffect(() => {
    fetchDestination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { item };
};

export default useGetByCategoryAndID;
