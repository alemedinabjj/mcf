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
  Checkbox,
} from "@chakra-ui/react";
import { formatPrice } from "../../utils/formatPrice";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "../../contexts/AuthContext";
import { updateParcela } from "../../api/api";
import { List } from "./List";
import { useEffect } from "react";

export function Modal({ divida, setDividas }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getDividas } = useAuth();

  console.log("divida", divida);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

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
          <ModalHeader>
            <h1>Detalhes da dívida - {divida.name} </h1>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column">
            <Flex
              bg="gray.100"
              p={isWideVersion ? "8" : "2"}
              borderRadius={2}
              justify="space-between"
              align="center"
            >
              <Text as="h2">Valor da dívida {formatPrice(divida.value)}</Text>
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
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
}
