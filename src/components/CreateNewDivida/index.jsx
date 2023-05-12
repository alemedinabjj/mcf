import { formatPrice } from "../../utils/formatPrice";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { Form } from "../Form";
import {
  Button,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export function CreateNewDivida() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  function handleCloseModal() {
    onClose();
  }

  return (
    <>
      <Button
        variant="ghost"
        colorScheme="blue"
        size="sm"
        fontSize="md"
        onClick={onOpen}
      >
        Criar nova dívida
      </Button>

      <ChakraModal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("gray.100", "gray.900")}>
          <ModalHeader bg={useColorModeValue("gray.100", "gray.800")}>
            <h1>Criar nova dívida</h1>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column">
            <Form handleCloseModal={handleCloseModal} />
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
}
