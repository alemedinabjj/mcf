import { Text, useColorModeValue } from "@chakra-ui/react";

export function PerMonth() {
  return (
    <>
      <h1>Quanto você ganha por mês?</h1>
      <Text
        as="span"
        fontSize="sm"
        color={useColorModeValue("gray.600", "gray.300")}
      >
        Digite o valor que você ganha por mês
      </Text>

      <Text
        as="span"
        fontSize="sm"
        color={useColorModeValue("gray.600", "gray.300")}
      >
        Em manutenção
      </Text>
    </>
  );
}
