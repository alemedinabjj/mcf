import {
  Box,
  Flex,
  Grid,
  Text,
  keyframes,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { formatPrice } from "../../utils/formatPrice";
import { useAuth } from "../../contexts/AuthContext";
import { format, addMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Summary() {
  const { dividas, infoUser } = useAuth();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const animation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

  const summary = dividas?.reduce(
    (acc, divida) => {
      const valor = divida.arrayParcelas.reduce((acc, parcela) => {
        if (!parcela.pago) {
          if (parcela.date.includes(format(new Date(), "yyyy-MM"))) {
            return acc + parcela.value;
          }
        }

        if (
          parcela.pago &&
          parcela.date.includes(format(new Date(), "yyyy-MM"))
        ) {
          return acc - parcela.value;
        }

        return acc;
      }, 0);
      return {
        pago: valor < 0 ? acc.pago + valor : acc.pago,
        aPagar: valor > 0 ? acc.aPagar + valor : acc.aPagar,
      };
    },
    { pago: 0, aPagar: 0 }
  );

  const valorPago = Math.abs(summary.pago);

  const reduceProximoMes = dividas?.reduce(
    (acc, divida) => {
      const valor = divida.arrayParcelas.reduce((acc, parcela) => {
        const proximoMes = addMonths(new Date(), 1);
        const mesAtual = format(proximoMes, "yyyy-MM");

        const parcelaMes = parcela.date.substr(0, 7);
        if (parcelaMes === mesAtual) {
          return parcela.pago ? acc - parcela.value : acc + parcela.value;
        }

        return acc;
      }, 0);

      return {
        pago: valor < 0 ? acc.pago + valor : acc.pago,
        aPagar: valor > 0 ? acc.aPagar + valor : acc.aPagar,
      };
    },
    { pago: 0, aPagar: 0 }
  );

  console.log(reduceProximoMes);

  return (
    <>
      <Grid
        templateColumns={isWideVersion ? "repeat(3, 1fr)" : "repeat(1, 1fr)"}
        gap={6}
        w="100%"
        mx="auto"
      >
        <Flex
          flexDir="column"
          borderRadius={8}
          bg={useColorModeValue("gray.100", "gray.700")}
          color={useColorModeValue("gray.700", "gray.100")}
          p="8"
          animation={`${animation} ease-in-out 0.5s`}
          position="relative"
        >
          <Text fontSize="sm" fontWeight="bold" letterSpacing="tight">
            Dívidas do mês
          </Text>
          <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
            Faltam
          </Text>
          <Text fontSize="xl" letterSpacing="tight" color="red.500">
            {formatPrice(summary.aPagar)}
          </Text>
          <Text>
            {summary.aPagar
              ? `Você tem ${formatPrice(summary.aPagar)} em dívidas esse mês`
              : "Você não tem nenhuma dívida esse mês"}
          </Text>
        </Flex>
        <Flex
          flexDir="column"
          borderRadius={8}
          bg={useColorModeValue("gray.100", "gray.700")}
          color={useColorModeValue("gray.700", "gray.100")}
          p="8"
          animation={`${animation} ease-in-out 0.5s`}
          position="relative"
        >
          <Text fontSize="sm" fontWeight="bold" letterSpacing="tight">
            Dívidas do mês
          </Text>
          <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
            Pago
          </Text>
          <Text fontSize="xl" letterSpacing="tight" color="green.500">
            {formatPrice(valorPago)}
          </Text>
          <Text>
            {summary.pago
              ? `Você pagou ${formatPrice(valorPago)} em dívidas esse mês`
              : "Você não pagou nenhuma dívida esse mês"}
          </Text>
          {infoUser?.salario && (
            <Box
              position="absolute"
              top="0"
              right="0"
              bg="green.500"
              color="gray.100"
              p="2"
              borderRadius="0 0 0 8px"
            >
              <Text fontSize="sm" fontWeight="bold" letterSpacing="tight">
                Seu saldo
              </Text>
              <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
                {formatPrice(infoUser?.salario - valorPago)}
              </Text>
            </Box>
          )}
        </Flex>
        <Flex
          flexDir="column"
          borderRadius={8}
          bg={useColorModeValue("gray.100", "gray.700")}
          color={useColorModeValue("gray.700", "gray.100")}
          p="8"
          animation={`${animation} ease-in-out 0.5s`}
          position="relative"
        >
          <Text fontSize="sm" fontWeight="bold" letterSpacing="tight">
            Dívidas do mês de{" "}
            {format(addMonths(new Date(), 1), "MMMM", { locale: ptBR })}
          </Text>
          <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
            Está previsto
          </Text>
          <Text fontSize="xl" letterSpacing="tight" color="red.500">
            {formatPrice(reduceProximoMes.aPagar)}
          </Text>
          <Text>
            {reduceProximoMes.aPagar
              ? `Você tem ${formatPrice(
                  reduceProximoMes.aPagar
                )} em dívidas previstas para o mês de ${format(
                  addMonths(new Date(), 1),
                  "MMMM",
                  { locale: ptBR }
                )}`
              : "Você não tem nenhuma dívida prevista para o mês de " +
                format(addMonths(new Date(), 1), "MMMM", { locale: ptBR })}
          </Text>
          {infoUser.salario && (
            <Text
              as="span"
              fontSize="sm"
              fontWeight="bold"
              letterSpacing="tight"
            >
              Com o seu salário de {formatPrice(infoUser.salario)} você terá{" "}
              {formatPrice(infoUser.salario - reduceProximoMes.aPagar)}{" "}
              disponível
            </Text>
          )}
        </Flex>
      </Grid>
    </>
  );
}
