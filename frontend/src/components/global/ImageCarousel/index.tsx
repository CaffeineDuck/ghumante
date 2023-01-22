import React, { useState, useEffect } from "react";
import { Box, Stack } from "@chakra-ui/layout";
import { Img } from "@chakra-ui/image";
import { PrevArrow, NextArrow } from "./SliderArrow";
import {} from "./Slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "./Slider";
function ImageCarousel({ images }: { images: string[] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const mainSliderRef = React.useRef<any>();
  const smallSliderRef = React.useRef<any>();

  const mainSettings = {
    dots: false,
    arrow: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: any) => setActiveSlide(current),
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const smallSettings = {
    dots: false,
    arrow: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box width="100%">
      <Slider
        asNavFor={smallSliderRef.current}
        {...mainSettings}
        ref={(slider: any) => (mainSliderRef.current = slider)}
      >
        {images.map((image, index) => {
          return (
            <Box key={index} borderRadius="10px">
              <Img width="100%" src={image} borderRadius="10px" />
            </Box>
          );
        })}
      </Slider>

      <Box mt={6}>
        <Slider
          asNavFor={mainSliderRef.current}
          {...smallSettings}
          ref={(slider) => (smallSliderRef.current = slider)}
          infinite={false}
          slidesToShow={4}
          slidesToScroll={2}
        >
          {images.map((image, index) => {
            return (
              <Stack
                onClick={() => mainSliderRef?.current.slickGoTo(index)}
                key={index}
                px={1}
                overflow="hidden"
              >
                <Box borderRadius="10px">
                  <Img
                    width="100%"
                    borderRadius="10px"
                    border="2px solid"
                    borderColor={activeSlide == index ? "gray.700" : "white"}
                    src={image}
                  />
                </Box>
              </Stack>
            );
          })}
        </Slider>
      </Box>
    </Box>
  );
}

export default ImageCarousel;
