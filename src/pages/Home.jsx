import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Flex,
  Grid,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { deleteDivida } from "../api/api";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { Form } from "../components/Form";
import { Link } from "react-router-dom";

export function Home() {
  const { dividas, sharedDividas, user } = useAuth();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Box
        w="100%"
        p={4}
        minH="calc(100vh - 64px)"
        color={useColorModeValue("gray.700", "gray.100")}
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
          <Form dividas={dividas} />
          <Link to={`/dividas/${user.uid}`}>Shared</Link>
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
              <Card key={index} divida={divida} />
            ))}
          </Grid>
        </Flex>
      </Box>
    </>
  );
}
