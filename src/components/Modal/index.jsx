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
} from "@chakra-ui/react";
import { formatPrice } from "../../utils/formatPrice";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Modal({ divida }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              templateColumns="repeat(3, 1fr)"
              mt="8"
              justify="space-between"
              align="center"
            >
              <Text as="h2">Parcelas</Text>
              <Text as="h2">Valor</Text>
              <Text as="h2">Vencimento</Text>
            </Grid>
            {divida.arrayParcelas.map((parcela, index) => (
              <Grid
                key={index}
                w="100%"
                bg="gray.100"
                paddingBlock={isWideVersion ? "6" : "2"}
                templateColumns="repeat(3, 1fr)"
                borderRadius={2}
                justify="space-between"
                align="center"
                mt="4"
              >
                <Text as="h2">{index + 1}ª parcela</Text>
                <Text as="h2">{formatPrice(parcela.value)}</Text>
                <Text as="h2">
                  {format(new Date(parcela.date), "dd 'de' MMMM ", {
                    locale: ptBR,
                  })}
                </Text>
              </Grid>
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
