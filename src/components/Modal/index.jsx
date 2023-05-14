import {
  Button,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Flex,
  Grid,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { formatPrice } from "../../utils/formatPrice";
import { useAuth } from "../../contexts/AuthContext";
import { List } from "./List";
import { usePdfGenerator } from "../../hooks/usePdfGenerator";

export function Modal({ divida }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setDividas } = useAuth();
  console.log(divida);

  const generatePDF = usePdfGenerator(
    ["Parcela", "Valor", "Vencimento", "Pago"],
    (data) =>
      data.map((parcela, index) => [
        index + 1,
        formatPrice(parseFloat(parcela.value)),
        parcela.date,
        parcela.pago ? "Sim" : "Não",
      ]),
    `Detalhes da dívida - ${divida.name}`
  );

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const valueTotal = divida?.arrayParcelas?.reduce(
    (acc, curr) => {
      const { value, pago } = curr;

      if (pago) {
        return {
          ...acc,
          pago: acc.pago + value,
        };
      }

      return {
        ...acc,
        pendente: acc.pendente + value,
      };
    },
    { pago: 0, pendente: 0 }
  );

  return (
    <>
      <Button
        variant="ghost"
        colorScheme="blue"
        size="sm"
        fontSize="md"
        onClick={onOpen}
      >
        Detalhes
      </Button>

      <ChakraModal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={useColorModeValue("gray.100", "gray.800")}>
            <h1>Detalhes da dívida - {divida.name} </h1>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column">
            <Flex
              p={isWideVersion ? "8" : "2"}
              borderRadius={2}
              justify="space-between"
              align="center"
              bg={useColorModeValue("gray.100", "gray.800")}
            >
              <Text as="h2">
                Valor da dívida {formatPrice(valueTotal.pendente)}
              </Text>
              <Text as="h2">{divida.arrayParcelas.length} parcelas</Text>
            </Flex>
            <Grid
              templateColumns="1fr 1fr 1fr .3fr"
              mt="8"
              justify="space-between"
              align="center"
            >
              <Text as="h2">Parcelas</Text>
              <Text as="h2">Valor</Text>
              <Text as="h2">Vencimento</Text>
              <Text as="h2">Pago</Text>
            </Grid>
            {divida.arrayParcelas.map((parcela, index) => (
              <List
                key={index}
                divida={divida}
                parcela={parcela}
                index={index}
                setDividas={setDividas}
              />
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => generatePDF(divida.arrayParcelas)}
            >
              Gerar PDF
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
}
