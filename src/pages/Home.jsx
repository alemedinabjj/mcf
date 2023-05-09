import { useAuth } from "../contexts/AuthContext";
import { Box, Flex, Grid, useBreakpointValue } from "@chakra-ui/react";
import { deleteDivida } from "../api/api";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { Form } from "../components/Form";

export function Home() {
  const { user, handleLogout, getDividas } = useAuth();
  const [dividas, setDividas] = useState([]);

  function submitLogout() {
    handleLogout();
  }

  useEffect(() => {
    if (user) {
      getDividas().then((data) => {
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
