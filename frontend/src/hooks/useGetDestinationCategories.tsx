import { axiosInstance } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";

const useGetDestinationCategories = () => {
  const [destinationCategories, setDestinationCategories] = useState<
    DestinationCategoryInterface[]
  >([]);
  const fetchDestination = async () => {
    try {
      const response = await axiosInstance.get("/api/destination-category");
      const mappedData = response.data;
      setDestinationCategories(mappedData);
    } catch (e) {}
  };
  useEffect(() => {
    fetchDestination();
  }, []);
  return { destinationCategories };
};

export default useGetDestinationCategories;
