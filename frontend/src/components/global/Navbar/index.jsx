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
  HStack,
  MenuItem,
  Divider,
  MenuList,
  MenuButton,
  Menu,
  Center,
  Heading,
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
              height={50}
              width={50}
              src="/logo.svg"
              alt=""
            />
          </Link>
          {DesktopNav()}
        </Flex>

        {isAuthenticated ? (
          <Menu>
            <MenuButton
              bg="#eeeeee"
              boxShadow="rgba(0, 0, 0, 0.18) 0px 2px 4px"
              color=""
              fontSize="1.1rem"
              borderRadius="18px"
              as={Button}
              px="0"
              paddingRight="10px"
              h="fit-content"
            >
              <HStack>
                <Avatar size="sm" />
                <Text
                  fontSize={18}
                  color="gray.600"
                  textTransform="capitalize"
                  as="span"
                >
                  <Icon icon="ic:round-menu" />
                </Text>
              </HStack>
            </MenuButton>
            <MenuList
              bg="#ffffff"
              zIndex={5}
              py="0"
              minW="250px"
              // py={5}
              minH="150px"
              borderRadius="lg"
              boxShadow="sm"
            >
              {/* <MenuItem
                _hover={{ bg: "transparent" }}
                bg="transparent"
                cursor="text"
                px={25}
              >
                <Flex direction="column">
                  <Text as="h3" fontSize="17px">
                    {profile.phone_number}
                  </Text>
                  <Text as="p" fontSize="14px" color="#777777">
                    Email: {profile.email || "N/A"}
                  </Text>
                </Flex>
              </MenuItem>
              <Divider h="10px" />
              <MenuItem
                px={25}
                bg="transparent"
                _hover={{ bg: "transparent" }}
                fontSize="1.1rem"
                onClick={() => {
                  logoout();
                }}
              >
                <HStack>
                  <Icon
                    icon="ic:baseline-logout"
                    color="var(--chakra-colors-primary)"
                  />
                  <Text fontSize={15} color="var(--chakra-colors-primary)">
                    Logout
                  </Text>
                </HStack>
              </MenuItem> */}

              <Box
                maxW={"270px"}
                w={"full"}
                bg={"light"}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
              >
                <Flex justify={"center"} mt={12}>
                  <Avatar
                    size={"lg"}
                    alt={profile?.phone_number}
                    css={{
                      border: "2px solid white",
                    }}
                  />
                </Flex>

                <Box p={6}>
                  <Stack spacing={0} align={"center"} mb={5}>
                    <Heading
                      fontSize={"2xl"}
                      fontWeight={500}
                      fontFamily={"body"}
                    >
                      {profile?.first_name} {profile?.last_name}
                    </Heading>
                    <Text color={"gray.500"}>{profile?.phone_number}</Text>
                  </Stack>

                  <Button
                    w={"full"}
                    mt={8}
                    bg={"primary"}
                    color={"white"}
                    rounded={"md"}
                    onClick={() => logoout()}
                    leftIcon={
                      <Icon
                        icon="material-symbols:logout-rounded"
                        fontSize={18}
                      />
                    }
                    _hover={{
                      transform: "primaryHover",
                      boxShadow: "lg",
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              </Box>
            </MenuList>
          </Menu>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"md"}
              fontWeight={600}
              as={"a"}
              color={"white"}
              bg={"primary"}
              href={"/login"}
              _hover={{
                bg: "primaryHover",
              }}
            >
              Sign In
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
