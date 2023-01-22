import React from "react";
import { Box } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify/react";

export const PrevArrow = ({
  className,
  currentSlide,
  slideCount,
  onClick,
  ...props
}: any) => {
  let noMore = className.includes("slick-disabled");
  return (
    <Box position="absolute" bottom="50%" zIndex={10}>
      <IconButton
        onClick={onClick}
        borderRadius="100%"
        aria-label=""
        boxShadow="lg"
        opacity={!noMore ? 1 : 0}
        disabled={noMore}
      >
        <Icon
          icon="material-symbols:chevron-left-rounded"
          fontSize="32px"
          fontWeight="600"
        />
      </IconButton>
    </Box>
  );
};

export const NextArrow = ({ className, onClick }: any) => {
  let noMore = className.includes("slick-disabled");
  return (
    <Box position="absolute" bottom="50%" right={0} zIndex={10}>
      <IconButton
        aria-label=""
        onClick={onClick}
        borderRadius="100%"
        boxShadow="lg"
        opacity={!noMore ? 1 : 0}
      >
        <Icon
          icon="ic:outline-chevron-right"
          fontSize="32px"
          fontWeight="600"
        />
      </IconButton>
    </Box>
  );
};
