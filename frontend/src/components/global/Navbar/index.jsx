import AppContext from "@/context/AppContext";
import { removeStorage } from "@/utils/storage";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  useColorModeValue,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useContext } from "react";
export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { isAuthenticated, profile, setProfile, setIsAuthenticated } =
    useContext(AppContext);
  const logoout = () => {
    removeStorage("X-Access-Token");
    setIsAuthenticated(false);
    setProfile(null);
  };
  // const NAV_ITEMS = useMemo(
  //   () => [
  //     {
  //       label: "Explore",
  //       href: "/explore",
  //     },
  //     {
  //       label: "Categories",
  //       children: categories?.map((category) => ({
  //         label: category.name,
  //         href: `/category/${category.id}`,
  //       })),
  //     },
  //   ],
  //   [categories]
  // );

  const MobileNav = () => {
    return (
      <Stack bg={"white"} p={4} display={{ md: "none" }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };

  const DesktopNav = () => {
    return (
      <Stack direction={"row"} spacing={4} align="center">
        {NAV_ITEMS.map((item, index) => (
          <Link
            key={index}
            p={2}
            href={item.href ?? "#"}
            fontSize={"md"}
            fontWeight={500}
            color={"gray.2"}
            _hover={{
              textDecoration: "none",
              color: "primary",
            }}
          >
            {item.label}
          </Link>
        ))}
      </Stack>
    );
  };
  return (
    <Box
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={"gray.200"}
      w="full"
      position="sticky"
      zIndex={20}
      bg={"light"}
      top="0"
    >
      <Flex
        minH={"60px"}
        py={{ base: 2 }}
        align={"center"}
        maxW="container.mw"
        mx="auto"
        px={{ base: "1.2rem", md: "5rem", lg: "6rem" }}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            color="gray.3"
            _hover={{ color: isOpen ? "red" : "gray.1" }}
            icon={
              isOpen ? (
                <Icon icon="codicon:chrome-close" fontSize="1.5rem" />
              ) : (
                <Icon icon="radix-icons:hamburger-menu" fontSize="1.5rem" />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          items="center"
          gap="2rem"
        >
          <Link href="/" color={"gray.800"} _hover={{ color: "primary" }}>
            <Image
              layout="fixed"
              height={65}
              width={65}
              src="/logo.svg"
              alt=""
            />
          </Link>
          {DesktopNav()}
        </Flex>

        {isAuthenticated ? (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
            align="center"
          >
            <Box display="flex" gap={2} alignItems="center">
              <Avatar size="md" />
              <Text size="md">{`${profile.name}`.split(" ")[0]}</Text>
            </Box>
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              as={"a"}
              color={"white"}
              bg={"primary"}
              href={"/register"}
              _hover={{
                bg: "primaryHover",
              }}
              onClick={() => logoout()}
            >
              Logout
            </Button>
          </Stack>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              as={"a"}
              fontSize={"md"}
              fontWeight={400}
              variant={"link"}
              href={"/login"}
              color="dark"
              _hover={{ color: "primary" }}
            >
              Sign In
            </Button>
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"md"}
              fontWeight={600}
              as={"a"}
              color={"white"}
              bg={"primary"}
              href={"/register"}
              _hover={{
                bg: "primaryHover",
              }}
            >
              Sign Up
            </Button>
          </Stack>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        {MobileNav()}
      </Collapse>
    </Box>
  );
}

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: "primaryAccent" }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "primary" }}
            fontWeight={500}
            color="gray.3"
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
          color="primary"
        >
          <Icon icon="akar-icons:chevron-right" fontSize="1.2rem" />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        color={"gray.3"}
        _hover={{
          textDecoration: "none",
          color: "primary",
        }}
      >
        <Text fontWeight={600}>{label}</Text>
        {children && (
          <Icon
            icon="akar-icons:chevron-right"
            style={{
              transition: "all .25s ease-in-out",
              transform: isOpen ? "rotate(180deg)" : "",
            }}
            fontSize="1.5rem"
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Explore",
    href: "#",
  },
  {
    label: "Categories",
    href: "#",
  },
  {
    label: "About Us",
    href: "#",
  },
];
