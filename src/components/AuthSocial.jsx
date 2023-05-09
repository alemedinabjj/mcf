import { Flex, Icon, Text } from "@chakra-ui/react";

export function AuthSocial({ icon, label, onClick, ...rest }) {
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
      onClick={onClick}
    >
      <Icon as={icon} fontSize="xl" />
      <Text
        as="span"
        ml="2"
        fontSize="md"
        fontWeight="bold"
        _hover={{ color: "gray.700" }}
      >
        {label}
      </Text>
    </Flex>
  );
}
