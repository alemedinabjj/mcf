import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { SignUp as SignUpForm } from "../components/SignUp";
import { Background } from "../global/Background";

export function SignUp() {
  return (
    <>
      <Background />
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        w="100%"
        p={4}
        color={useColorModeValue("gray.700", "gray.100")}
        position="relative"
        zIndex={5}
        opacity="0.9"
      >
        <Text
          as="h1"
          fontSize="4xl"
          fontWeight="bold"
          textAlign="center"
          color={useColorModeValue("gray.700", "gray.100")}
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
