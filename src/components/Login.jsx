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
        <Input type="text" placeholder="seu email" {...register("email")} />
      </InputGroup>

      <InputGroup>
        <InputLeftAddon children="Senha" minWidth="120px" />
        <Input
          type="password"
          placeholder="sua senha"
          {...register("password")}
        />
      </InputGroup>

      <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
        Faça Login
      </Button>

      <Text as={Link} to="/signup" fontSize="sm" color="blue.500">
        Não tem uma conta? Cadastre-se
      </Text>
    </Stack>
  );
}
