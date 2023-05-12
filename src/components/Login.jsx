import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { AuthSocial } from "./AuthSocial";
import { signInWithGithub, signInWithGoogle } from "../api/api";
import { Background } from "../global/Background";

export function Login() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  async function handleSignInGoogle() {
    const response = await signInWithGoogle();

    console.log(response);
  }

  async function handleSignInGithub() {
    const response = await signInWithGithub();

    console.log(response);
  }

  function handleSignIn(data) {
    console.log(data);
    login(data);

    navigate("/");
  }
  return (
    <>
      <Background />
      <Stack
        spacing={4}
        as="form"
        onSubmit={handleSubmit(handleSignIn)}
        bg={useColorModeValue("gray.100", "gray.800")}
        position="relative"
        zIndex={5}
        p={4}
      >
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

        <Text
          as={Link}
          to="/signup"
          fontSize="sm"
          color={useColorModeValue("blue.500", "blue.200")}
          posisiton="relative"
          zIndex={2}
        >
          Não tem uma conta? Cadastre-se
        </Text>
        <AuthSocial
          label="Login com Google"
          icon={FcGoogle}
          onClick={handleSignInGoogle}
        />
        <AuthSocial
          label="Login com Github"
          icon={AiFillGithub}
          onClick={handleSignInGithub}
        />
      </Stack>
    </>
  );
}
