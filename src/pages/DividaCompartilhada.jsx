import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDividasSharedByUser } from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import { Flex, Grid, Text } from "@chakra-ui/react";
import { Card } from "../components/Card";

export function DividaCompartilhada() {
  const { user } = useAuth();
  const { userid, dividaId } = useParams();
  const [divida, setDivida] = useState(null);

  async function getDividas() {
    const sharedDividas = await getDividasSharedByUser(user.uid);

    setDivida(sharedDividas);

    return sharedDividas;
  }

  useEffect(() => {
    if (user) {
      getDividas();
    }
  }, [userid]);

  console.log("divida", divida);

  if (!divida) {
    return <div>Carregando...</div>;
  }

  return (
    <Flex
      flexDir="column"
      w="100%"
      maxWidth={1480}
      mx="auto"
      px="6"
      align="center"
    >
      <Text fontSize="3xl" fontWeight="bold" mb="4" textAlign="center">
        Dividas Compartilhadas
      </Text>

      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        justifyContent="space-between"
        w="100%"
        mx="auto"
        maxW={1480}
        mt="4"
      >
        {divida?.map((divida) => (
          <Flex key={divida.id} flexDir="column" gap={2}>
            <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
              Dívida de {divida?.sharedBy}
            </Text>

            <Card divida={divida} />
          </Flex>
        ))}
      </Grid>

      <Text
        as={Link}
        to={`/`}
        fontSize="xl"
        fontWeight="bold"
        pt="4"
        textAlign="center"
      >
        Voltar
      </Text>
    </Flex>
  );
}
