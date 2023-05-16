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
  useColorModeValue,
  FormControl,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { FcDataConfiguration } from "react-icons/fc";
import { FaMoon, FaSun } from "react-icons/fa";
import { useColorMode } from "@chakra-ui/react";
import { RegisterSalary } from "./RegisterSalary";

export function Menu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [photo, setPhoto] = React.useState(null);
  const { user, handleEditUser } = useAuth();
  const { register, handleSubmit, formState, setValue, watch } = useForm({});
  const { colorMode, toggleColorMode } = useColorMode();

  function handleSalaryTotal(salaryTotal) {
    setValue("salaryTotal", salaryTotal);
  }

  const salaryTotal = watch("salaryTotal");

  async function editUser(data) {
    await handleEditUser(data, photo, salaryTotal);
    onClose();
  }

  return (
    <>
      <Icon
        as={FcDataConfiguration}
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

              <Flex align={"flex-end"} justify={"space-between"}>
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
                <Avatar
                  name={user?.displayName}
                  src={photo ? URL.createObjectURL(photo) : user?.photoURL}
                />
              </Flex>
              <FormControl display="flex" alignItems="center">
                <FormLabel
                  htmlFor="theme-mode"
                  mb="0"
                  onClick={toggleColorMode}
                  cursor="pointer"
                  color={useColorModeValue("yellow", "gray.100")}
                >
                  {colorMode === "light" ? (
                    <Flex alignItems="center">
                      <Icon as={FaSun} />
                      <Text ml="2">Light</Text>
                    </Flex>
                  ) : (
                    <Flex alignItems="center">
                      <Icon as={FaMoon} />
                      <Text ml="2">Dark</Text>
                    </Flex>
                  )}
                </FormLabel>
              </FormControl>

              <RegisterSalary handleSalaryTotal={handleSalaryTotal} />
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              isLoading={formState.isSubmitting}
              onClick={handleSubmit(editUser)}
            >
              Confirmar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
