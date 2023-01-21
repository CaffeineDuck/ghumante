import { Heading } from "@chakra-ui/react";
import React from "react";

const SectionTitle = ({ children, centered }) => {
  return (
    <Heading fontWeight="semibold" textAlign={centered ? "center" : "left"}>
      {children}
    </Heading>
  );
};

export default SectionTitle;

SectionTitle.defaultProps = {
  children: "",
  centered: false,
};
