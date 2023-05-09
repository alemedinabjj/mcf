import { Checkbox, Grid, Text, useBreakpointValue } from "@chakra-ui/react";
import { updateParcela, updateSharedDivida } from "../../api/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatPrice } from "../../utils/formatPrice";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export function List({ divida, index, parcela, setDividas }) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { getDividas, user, setSharedDividas } = useAuth();

  const handleUpdateParcela = async (dividaId, parcelaId, pago) => {
    const updatedParcela = {
      ...divida.arrayParcelas.find((parcela) => parcela.id === parcelaId),
      dividaId: dividaId,
      id: parcelaId,
      pago: pago,
    };

    await updateParcela(dividaId, updatedParcela);
    const newUpdated = await updateSharedDivida(dividaId, updatedParcela);

    setSharedDividas(newUpdated);

    getDividas().then((data) => setDividas(data));
  };

  return (
    <Grid
      key={index}
      w="100%"
      bg={
        parcela.pago
          ? "green.100"
          : new Date(parcela.date) < new Date()
          ? "red.100"
          : "gray.100"
      }
      paddingBlock={isWideVersion ? "6" : "0"}
      templateColumns="1fr 1fr 1fr .3fr"
      borderRadius={2}
      placeItems="center"
      align="center"
      mt="4"
      transition="all .2s ease-in-out"
    >
      <Text as="h2">{index + 1}ª parcela</Text>
      <Text as="h2">{formatPrice(parcela.value)}</Text>
      <Text as="h2" textAlign="center">
        {format(new Date(parcela.date), "dd 'de' MMM yyyy", {
          locale: ptBR,
        })}
      </Text>
      <Checkbox
        defaultChecked={parcela.pago}
        onChange={(e) =>
          handleUpdateParcela(divida.id, parcela.id, e.target.checked)
        }
      />
    </Grid>
  );
}
