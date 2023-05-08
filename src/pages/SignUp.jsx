import { Box, Flex, Text } from "@chakra-ui/react";
import { SignUp as SignUpForm } from "../components/SignUp";

export function SignUp() {
  return (
    <>
      <Box bg="gray.200" w="100%" p={4} color="white">
        <Text
          as="h1"
          fontSize="4xl"
          fontWeight="bold"
          textAlign="center"
          color="gray.600"
        >
          Cadastre-se
        </Text>
      </Box>
      <Box
        bg="gray.100"
        w="100%"
        p={4}
        minH="calc(100vh - 64px)"
        color="gray.500"
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
      >
        <SignUpForm />
      </Box>
    </>
  );
}
