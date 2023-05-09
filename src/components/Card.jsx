import { Flex, Icon, Text, keyframes } from "@chakra-ui/react";
import { Modal } from "./Modal";
import { BsFillTrash3Fill } from "react-icons/bs";
import { formatPrice } from "../utils/formatPrice";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AlertDelete } from "./Alert/AlertDelete";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";

export function Card({ divida, index, handleDeleteTask, setDividas }) {
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

  const isPaid = divida.paid;

  const isOld = divida.arrayParcelas.some(
    (parcela) => !parcela.pago && new Date(parcela.date) < new Date()
  );

  return (
    <Flex
      key={index}
      flexDir="column"
      borderRadius={8}
      bg={isPaid ? "green.100" : isOld ? "red.100" : "gray.50"}
      p="8"
      animation={`${animation} ease-in-out 0.5s`}
      position="relative"
    >
      {divida.paid && (
        <Icon
          as={BsFillPatchCheckFill}
          position="absolute"
          top="4"
          right="4"
          color="green.500"
          fontSize="2xl"
        />
      )}
      {!divida.paid && isOld && (
        <Icon
          as={RiErrorWarningFill}
          position="absolute"
          top="4"
          right="4"
          color="red.500"
          fontSize="2xl"
        />
      )}

      <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
        {divida.name}
      </Text>
      <Text fontSize="xl" letterSpacing="tight" color="red.500">
        {formatPrice(divida.value)}
      </Text>
      <Text>
        {format(new Date(divida.date), "dd 'de' MMMM 'de' yyyy", {
          locale: ptBR,
        })}
      </Text>
      <Modal divida={divida} setDividas={setDividas} />
      <Flex mt="8" justify="flex-end" align="center">
        <AlertDelete
          divida={divida}
          handleDeleteTask={() => handleDeleteTask(divida.id)}
        />
      </Flex>
    </Flex>
  );
}
