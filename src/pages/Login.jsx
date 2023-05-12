import {
  Box,
  Button,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Login as LoginForm } from "../components/Login";

export function Login() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        w="100%"
        p={4}
        color={useColorModeValue("gray.700", "gray.100")}
        position="relative"
        zIndex={5}
        opacity="0.9"
      >
        <Text as="h1" fontSize="4xl" fontWeight="bold" textAlign="center">
          Login
        </Text>
      </Box>
      <Box
        bg={useColorModeValue("gray.100", "gray.800")}
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        maxW="400px"
        w="100%"
        p={4}
        opacity="0.9"
        borderRadius="md"
        mx="auto"
      >
        <LoginForm />
      </Box>
    </>
  );
}
