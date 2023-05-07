import { Checkbox, Grid, Text, useBreakpointValue } from "@chakra-ui/react";
import { updateParcela } from "../../api/api";
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

  const { getDividas } = useAuth();

  const handleUpdateParcela = async (dividaId, parcelaId, pago) => {
    const updatedParcela = {
      ...divida.arrayParcelas.find((parcela) => parcela.id === parcelaId),
      dividaId: dividaId,
      id: parcelaId,
      pago: pago,
    };

    await updateParcela(dividaId, updatedParcela);
  };

  return (
    <Grid
      key={index}
      w="100%"
      bg="gray.100"
      paddingBlock={isWideVersion ? "6" : "0"}
      templateColumns="1fr 1fr 1fr .3fr"
      borderRadius={2}
      placeItems="center"
      align="center"
      mt="4"
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
