import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";

import { Icon } from "@iconify/react";
const ChakraIcon = chakra(Icon);
const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={"blackAlpha.100"}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: "blackAlpha.200",
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box bg={"gray.50"} mt="auto" color={"gray.700"}>
      <Container
        as={Stack}
        maxW="container.mw"
        mx="auto"
        px={{ base: "1.2rem", md: "5rem", lg: "6rem" }}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>
          &copy; {new Date().getFullYear()}, Ghumante. All rights reserved
        </Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Facebook"} href={"#"}>
            <ChakraIcon icon="akar-icons:facebook-fill" />
          </SocialButton>
          <SocialButton label={"Twitter"} href={"#"}>
            <ChakraIcon icon="ant-design:twitter-circle-filled" />
          </SocialButton>
          <SocialButton label={"Instagram"} href={"#"}>
            <ChakraIcon icon="akar-icons:instagram-fill" />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
