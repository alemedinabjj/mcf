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
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>

      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        w="100%"
        p={4}
        color={useColorModeValue("gray.700", "gray.100")}
      >
        <Text as="h1" fontSize="4xl" fontWeight="bold" textAlign="center">
          Entre com sua conta
        </Text>
      </Box>
      <Box
        bg={useColorModeValue("gray.100", "gray.800")}
        w="100%"
        p={4}
        minH="calc(100vh - 64px)"
        color="gray.500"
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
      >
        <LoginForm />
      </Box>
    </>
  );
}
