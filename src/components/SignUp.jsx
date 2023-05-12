import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import { signUpWithEmailAndPasswordAndName } from "../api/api";

export function SignUp() {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  async function handleSignUp(data) {
    console.log(data);

    try {
      await signUpWithEmailAndPasswordAndName(
        data.email,
        data.password,
        data.name
      );
      console.log("Usuário criado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  }

  return (
    <>
      <Stack spacing={4} as="form" onSubmit={handleSubmit(handleSignUp)}>
        <InputGroup>
          <InputLeftAddon children="Name" minWidth="120px" />
          <Input type="text" placeholder="seu apelido" {...register("name")} />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children="E-mail" minWidth="120px" />
          <Input
            type="text"
            placeholder="seu melhor e-mail"
            {...register("email")}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children="Senha" minWidth="120px" />
          <Input
            type="password"
            placeholder="sua melhor senha"
            {...register("password")}
          />
        </InputGroup>

        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Criar conta
        </Button>

        <Text
          as={Link}
          to="/login"
          fontSize="sm"
          color="blue.500"
          position="relative"
          zIndex={5}
        >
          Já tem uma conta? Faça login
        </Text>
      </Stack>
    </>
  );
}
