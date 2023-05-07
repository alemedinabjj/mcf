import { Box, Flex, Icon, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

export function Header({ user, submitLogout }) {
  return (
    <Box bg="gray.200" w="100%" p={4} color="white">
      <Flex
        as="header"
        w="100%"
        h="20"
        mx="auto"
        px="6"
        align="center"
        justify="space-between"
        color="gray.600"
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
        <Icon
          as={BiLogOut}
          fontSize="2xl"
          cursor="pointer"
          color="red.500"
          onClick={submitLogout}
        />
      </Flex>
    </Box>
  );
}
