import { Wrap } from "@chakra-ui/layout";
import { useTheme } from "@chakra-ui/system";
import { Icon } from "@iconify/react";

function Rating({ rating = 0 }) {
  const theme = useTheme();
  const count = 5;
  return (
    <Wrap fontSize={[12, 16]}>
      {Array(5)
        .fill(1)
        .map((star, index) => {
          if (rating > index + 1) {
            return (
              <Icon
                icon="material-symbols:star"
                key={index}
                style={{ margin: "2px", color: "yellow.400" }}
              />
            );
          } else if (index + 1 - rating <= 0.5) {
            return (
              <Icon
                icon="material-symbols:star-half"
                key={index}
                style={{ margin: "2px", color: "yellow.400" }}
              />
            );
          } else {
            return (
              <Icon
                icon="material-symbols:star-outline"
                key={index}
                style={{ margin: "2px", color: "yellow.400" }}
              />
            );
          }
        })}
    </Wrap>
  );
}

export default Rating;
