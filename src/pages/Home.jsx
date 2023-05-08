import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Button,
  Flex,
  Grid,
  Select,
  useBreakpointValue,
} from "@chakra-ui/react";
import InputFloating from "../components/InputFloating";
import { useForm } from "react-hook-form";
import { addDivida, deleteDivida } from "../api/api";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { Form } from "../components/Form";

export function Home() {
  const { user, handleLogout, getDividas } = useAuth();
  const [dividas, setDividas] = useState([]);
  const [todasDividas, setTodasDividas] = useState([]);

  function submitLogout() {
    handleLogout();
  }

  console.log("dividas", dividas);

  useEffect(() => {
    if (user) {
      getDividas().then((data) => {
        // setTodasDividas(data);
        setDividas(data);
      });
    }
  }, [user]);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  function handleDeleteTask(dividaId) {
    deleteDivida(user?.uid, dividaId).then(() => {
      getDividas().then((data) => {
        setDividas(data);
      });
    }),
      console.log("dividaId", dividaId);
  }

  function selectConcluidas() {
    const concluidas = todasDividas?.filter((divida) => {
      const { arrayParcelas } = divida;

      const isConcluida = arrayParcelas.every((parcela) => parcela.pago);

      return isConcluida;
    });

    setDividas(concluidas);
  }

  function selectNaoConcluidas() {
    const naoConcluidas = todasDividas?.filter((divida) => {
      const { arrayParcelas } = divida;

      const isConcluida = arrayParcelas.every((parcela) => parcela.pago);

      return !isConcluida;
    });

    setDividas(naoConcluidas);
  }

  function selectVencidas() {
    const vencidas = todasDividas?.filter((divida) => {
      const { arrayParcelas } = divida;

      const isVencida = arrayParcelas.some((parcela) => {
        const hoje = new Date();
        const dataParcela = new Date(parcela.data);
        return !parcela.pago && dataParcela < hoje;
      });

      return isVencida;
    });

    setDividas(vencidas);
  }

  function selectAVencer() {
    const aVencer = todasDividas?.filter((divida) => {
      const { arrayParcelas } = divida;

      const isAVencer = arrayParcelas.some((parcela) => {
        const hoje = new Date();
        const dataParcela = new Date(parcela.data);
        return !parcela.pago && dataParcela > hoje;
      });

      return isAVencer;
    });

    setDividas(aVencer);
  }

  function selectTodas() {
    getDividas().then((data) => setDividas(data));
  }

  return (
    <>
      <Header user={user} submitLogout={submitLogout} />
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
          <Form dividas={dividas} setDividas={setDividas} />
          <Grid
            templateColumns={
              isWideVersion ? "repeat(3, 1fr)" : "repeat(1, 1fr)"
            }
            gap={6}
            justifyContent="space-between"
            w="100%"
            mx="auto"
          >
            {dividas?.map((divida, index) => (
              <Card
                key={index}
                divida={divida}
                handleDeleteTask={handleDeleteTask}
                setDividas={setDividas}
              />
            ))}
          </Grid>
        </Flex>
      </Box>
    </>
  );
}
