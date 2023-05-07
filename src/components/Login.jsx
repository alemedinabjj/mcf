import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function handleSignIn(data) {
    console.log(data);
    login(data);

    navigate("/");
  }
  return (
    <Stack spacing={4} as="form" onSubmit={handleSubmit(handleSignIn)}>
      <InputGroup>
        <InputLeftAddon children="E-mail" minWidth="120px" />
        <Input type="text" placeholder="your email" {...register("email")} />
      </InputGroup>

      <InputGroup>
        <InputLeftAddon children="Pass" minWidth="120px" />
        <Input
          type="password"
          placeholder="your password"
          {...register("password")}
        />
      </InputGroup>

      <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
        Sign In
      </Button>

      <Text as={Link} to="/signup" fontSize="sm" color="blue.500">
        You not have an account? Sign Up
      </Text>
    </Stack>
  );
}
