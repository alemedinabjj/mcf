import { Flex, Icon, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export function AuthGoogle() {
  return (
    <Flex
      as="button"
      align="center"
      justify="center"
      w="100%"
      p={2}
      bg="white"
      borderRadius="md"
      color="gray.700"
      fontWeight="bold"
      _hover={{ bg: "gray.200", color: "gray.600" }}
    >
      <Icon as={FcGoogle} fontSize="xl" />
      <Text
        as="span"
        ml="2"
        fontSize="md"
        fontWeight="bold"
        _hover={{ color: "gray.700" }}
      >
        Entrar com Google
      </Text>
    </Flex>
  );
}
