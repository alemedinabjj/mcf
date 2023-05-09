import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUser } from "../../api/api";
import { GrConfigure } from "react-icons/gr";

export function Menu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [photo, setPhoto] = React.useState(null);
  const { user } = useAuth();
  const { register, handleSubmit, formState, setValue } = useForm({});

  function handleEditUser(data) {
    console.log(photo);

    const update = updateUser(user.uid, photo);

    console.log(update);

    onClose();
  }

  return (
    <>
      <Icon
        as={GrConfigure}
        fontSize="xl"
        onClick={onOpen}
        cursor={"pointer"}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Editar usuário</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Novo apelido</FormLabel>
                <Input
                  ref={firstField}
                  id="username"
                  placeholder="Por favor, digite seu novo apelido"
                  {...register("username")}
                />
              </Box>

              <Flex
                align={"flex-end"}
                justify={"space-between"}
                direction={{ base: "column", md: "row" }}
              >
                <Box>
                  <FormLabel htmlFor="file">Foto</FormLabel>
                  <InputGroup>
                    <Input
                      type="file"
                      id="file"
                      display="none"
                      onChange={(e) => {
                        setPhoto(e.target.files[0]);
                      }}
                    />
                    <label htmlFor="file">
                      <Button as="span" cursor="pointer">
                        Escolher foto
                      </Button>
                    </label>
                  </InputGroup>
                </Box>
                <Avatar name={user?.displayName} src={user?.photoURL} />
              </Flex>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              isLoading={formState.isSubmitting}
              onClick={handleSubmit(handleEditUser)}
            >
              Confirmar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
