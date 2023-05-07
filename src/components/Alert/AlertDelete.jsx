import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Icon,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { BsFillTrash3Fill } from "react-icons/bs";

import React from "react";

export function AlertDelete({ handleDeleteTask, divida }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  function handleDelete() {
    handleDeleteTask();
    onClose();
  }

  return (
    <>
      <Icon
        as={BsFillTrash3Fill}
        fontSize="2xl"
        cursor="pointer"
        color="red.500"
        onClick={onOpen}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar dívida {divida.name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja deletar essa dívida?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
