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
  Input,
  useToast,
} from "@chakra-ui/react";
import { BsFillShareFill } from "react-icons/bs";

import React from "react";
import { shareDivida } from "../../api/api";

export function SharedAlert({ divida }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [email, setEmail] = React.useState("");

  const toast = useToast();

  function handleShare() {
    console.log(email);
    const shared = shareDivida(divida.id, email);

    toast({
      title: "Divida compartilhada com sucesso",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    onClose();
  }

  return (
    <>
      <Icon
        as={BsFillShareFill}
        fontSize="2xl"
        cursor="pointer"
        color="blue.500"
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
              Compartilhar divida {divida.name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Digite o email da pessoa que você deseja compartilhar a divida
              <Input
                mt="2"
                placeholder="email da pessoa"
                onChange={(e) => setEmail(e.target.value)}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="blue" onClick={handleShare} ml={3}>
                Compartilhar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
