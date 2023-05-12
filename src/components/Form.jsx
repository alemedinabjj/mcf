import {
  Box,
  Button,
  Flex,
  Select,
  Text,
  useBreakpointValue,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import InputFloating from "./InputFloating";
import { useCallback } from "react";
import { addDivida } from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { formatPrice } from "../utils/formatPrice";

export function Form({ handleCloseModal }) {
  const { user, getDividas, setDividas, dividas } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const toast = useToast();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handleCreateTask = useCallback((data) => {
    const userId = user?.uid;

    const newDivida = {
      id: Date.now(),
      name: data.name,
      value: data.value,
      date: data.dueDate,
      paid: false,
      arrayParcelas: Array.from(Array(parseInt(data.installments)).keys()).map(
        (parcela, index) => ({
          id: Date.now() + index,
          paid: false,
          parcela: parcela + 1,
          value: data.value / parseInt(data.installments),
          date:
            index === 0
              ? data.dueDate
              : format(
                  new Date(
                    new Date(data.dueDate).setMonth(
                      new Date(data.dueDate).getMonth() + index
                    )
                  ),
                  "yyyy-MM-dd"
                ),
        })
      ),
    };

    addDivida(userId, newDivida).then(() => {
      getDividas().then((data) => {
        setDividas(data);
      });
    });

    toast({
      title: "Dívida cadastrada com sucesso!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    reset();
    handleCloseModal();
  }, []);

  return (
    <Box
      flex="1"
      borderRadius={8}
      w="100%"
      color={useColorModeValue("gray.500", "gray.200")}
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
        flexDir="column"
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
          {Array.from({ length: 64 }, (_, i) => i + 1).map((item) => (
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
      <Flex
        w="100%"
        align="center"
        gap={isWideVersion ? "4" : "6"}
        justifyContent="space-between"
        mt="8"
      >
        <Flex gap={2} ml="auto">
          <Button colorScheme="blue" type="submit">
            Cadastrar
          </Button>
          <Button colorScheme="blue" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
