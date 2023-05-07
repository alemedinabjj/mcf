import { Flex, Icon, Text } from "@chakra-ui/react";
import { Modal } from "./Modal";
import { BsFillTrash3Fill } from "react-icons/bs";
import { formatPrice } from "../utils/formatPrice";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Card({ divida, index }) {
  return (
    <Flex key={index} flexDir="column" borderRadius={8} bg="gray.50" p="8">
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
      <Modal divida={divida} />
      <Flex mt="8" justify="flex-end" align="center">
        <Icon
          as={BsFillTrash3Fill}
          fontSize="2xl"
          cursor="pointer"
          color="red.500"
          onClick={() => handleDeleteTask(String(divida.id))}
        />
      </Flex>
    </Flex>
  );
}
