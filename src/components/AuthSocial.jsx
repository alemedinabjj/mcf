import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";

export function AuthSocial({ icon, label, onClick, ...rest }) {
  return (
    <Flex
      as="button"
      align="center"
      justify="center"
      posisiton="relative"
      zIndex={2}
      w="100%"
      p={2}
      bg={useColorModeValue("white", "gray.900")}
      borderRadius="md"
      color={useColorModeValue("gray.700", "gray.200")}
      fontWeight="bold"
      _hover={{
        bg: useColorModeValue("gray.100", "gray.700"),
        color: useColorModeValue("gray.700", "gray.200"),
      }}
      onClick={onClick}
    >
      <Icon as={icon} fontSize="xl" />
      <Text as="span" ml="2" fontSize="md" fontWeight="bold">
        {label}
      </Text>
    </Flex>
  );
}
