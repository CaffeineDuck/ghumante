import React, { useState, useEffect } from "react";
import SlickSlider from "react-slick";

// eslint-disable-next-line react/display-name
const Slider = React.forwardRef<HTMLDivElement, any>(
  ({ children, responsive, ...rest }, ref) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    return (
      <SlickSlider
        ref={ref}
        key={isClient ? "client" : "server"}
        responsive={isClient ? responsive : null}
        {...rest}
      >
        {children}
      </SlickSlider>
    );
  }
);

export default Slider;
