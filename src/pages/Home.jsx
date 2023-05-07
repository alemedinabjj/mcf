import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Select,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import InputFloating from "../components/InputFloating";
import { useForm } from "react-hook-form";
import { addDivida, deleteDivida } from "../api/api";
import { useCallback, useEffect, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatPrice } from "../utils/formatPrice";
import { Modal } from "../components/Modal";

export function Home() {
  const { user, handleLogout, getDividas } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [dividas, setDividas] = useState([]);

  function submitLogout() {
    handleLogout();
  }

  console.log("dividas", dividas);

  const handleCreateTask = useCallback((data) => {
    console.log(data);
    const userId = user?.uid;

    const newDivida = {
      id: Date.now(),
      name: data.name,
      value: data.value,
      date: data.dueDate,
      arrayParcelas: Array.from(Array(parseInt(data.installments)).keys()).map(
        (parcela, index) => ({
          id: Date.now() + index,
          parcela: parcela + 1,
          value: data.value / parseInt(data.installments),
          date: new Date(data.dueDate).setMonth(
            new Date(data.dueDate).getMonth() + parcela + 1
          ),
        })
      ),
    };

    addDivida(userId, newDivida).then(() => {
      console.log(newDivida);
      getDividas().then((data) => setDividas(data));
    });

    reset();
  }, []);

  useEffect(() => {
    if (user) {
      getDividas().then((data) => setDividas(data));
    }
  }, [user]);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  function handleDeleteTask(dividaId) {
    deleteDivida(user?.uid, dividaId).then(() => {
      getDividas().then((data) => setDividas(data));
    }),
      console.log("dividaId", dividaId);
  }

  return (
    <>
      <Box bg="gray.200" w="100%" p={4} color="white">
        <Flex
          as="header"
          w="100%"
          h="20"
          mx="auto"
          px="6"
          align="center"
          justify="space-between"
          color="gray.600"
        >
          <Flex flexDir="column" align="flex-start">
            <Text fontSize="xl" fontWeight="bold" letterSpacing="tight" w="64">
              Olá, {user?.displayName}
            </Text>
            <Text as="span" fontSize="sm" letterSpacing="tight" w="64">
              Seja bem vindo!
            </Text>
          </Flex>
          <Icon
            as={BiLogOut}
            fontSize="2xl"
            cursor="pointer"
            color="red.500"
            onClick={submitLogout}
          />
        </Flex>
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
        <Flex
          as="main"
          w="100%"
          maxWidth={1480}
          mx="auto"
          px={isWideVersion ? "6" : "0"}
          align="center"
          flexDir="column"
          gap="2rem"
        >
          <Box
            flex="1"
            borderRadius={8}
            bg="gray.50"
            p="8"
            as="form"
            onSubmit={handleSubmit(handleCreateTask)}
            maxWidth={1480}
            mx="auto"
            px={isWideVersion ? "6" : "3"}
          >
            <Flex mb="8" justify="space-between" align="center">
              Cadastre sua divida, para controlar seus gastos.
            </Flex>
            <Flex
              w="100%"
              align="center"
              gap={isWideVersion ? "4" : "6"}
              direction={isWideVersion ? "row" : "column"}
            >
              <InputFloating
                label="Nome da dívida"
                type="text"
                {...register("name")}
              />
              <InputFloating
                label="Valor total"
                type="number"
                {...register("value")}
              />
              <Select
                placeholder="Quantidade de parcelas"
                {...register("installments")}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
              <InputFloating
                label="Vencimento"
                type="date"
                {...register("dueDate")}
              />
            </Flex>
            <Flex mt="8" justify="flex-end">
              <Button type="submit">Cadastrar</Button>
            </Flex>
          </Box>
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={6}
            w="100%"
            maxWidth={985}
            mx="auto"
            p={isWideVersion ? "8" : "1"}
          >
            {dividas?.map((divida, index) => (
              <Flex
                key={index}
                flexDir="column"
                borderRadius={8}
                bg="gray.50"
                p="8"
              >
                <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
                  {divida.name}
                </Text>
                <Text fontSize="xl" letterSpacing="tight" color="red.500">
                  {formatPrice(divida.value)}
                </Text>
                <Text>
                  {format(new Date(divida.date), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </Text>
                <Modal divida={divida} />
                <Flex mt="8" justify="flex-end" align="center">
                  <Icon
                    as={BsFillTrash3Fill}
                    fontSize="2xl"
                    cursor="pointer"
                    color="red.500"
                    onClick={() => handleDeleteTask(String(divida.id))}
                  />
                </Flex>
              </Flex>
            ))}
          </Grid>
        </Flex>
      </Box>
    </>
  );
}
