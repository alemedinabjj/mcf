import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Switch,
  Text,
  Wrap,
  WrapItem,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Menu } from "./Menu";
import { useAuth } from "../contexts/AuthContext";
import { FaMoon, FaSun } from "react-icons/fa";

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { user, handleLogout } = useAuth();

  function submitLogout() {
    handleLogout();
  }

  return (
    <Box
      bg={useColorModeValue("gray.200", "gray.900")}
      w="100%"
      p={4}
      color={useColorModeValue("gray.700", "white")}
    >
      <FormControl display="flex" alignItems="center">
        <FormLabel
          htmlFor="theme-mode"
          mb="0"
          onClick={toggleColorMode}
          cursor="pointer"
          color={useColorModeValue("yellow", "gray.100")}
        >
          {colorMode === "light" ? <Icon as={FaSun} /> : <Icon as={FaMoon} />}
        </FormLabel>
      </FormControl>
      <Flex
        as="header"
        w="100%"
        h="20"
        mx="auto"
        align="center"
        justify="space-between"
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Flex flexDir="column" align="flex-start">
          <Flex align="center" gap="4">
            {" "}
            <Wrap>
              <WrapItem>
                <Avatar name={user?.displayName} src={user?.photoURL} />
              </WrapItem>
            </Wrap>
            <Flex flexDir="column">
              <Text
                fontSize="xl"
                fontWeight="bold"
                letterSpacing="tight"
                w="64"
              >
                Olá, {user?.displayName}
              </Text>
              <Text as="span" fontSize="sm" letterSpacing="tight" w="64">
                Seja bem vindo!
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex gap={5} alignItems="center">
          <Menu />
          <Icon
            as={BiLogOut}
            fontSize="2xl"
            cursor="pointer"
            color="red.500"
            onClick={submitLogout}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
