import {
  Flex,
  Icon,
  Text,
  keyframes,
  useColorModeValue,
} from "@chakra-ui/react";
import { Modal } from "./Modal";
import { BsFillTrash3Fill } from "react-icons/bs";
import { formatPrice } from "../utils/formatPrice";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AlertDelete } from "./Alert/AlertDelete";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { SharedAlert } from "./Alert/SharedAlert";
import { useAuth } from "../contexts/AuthContext";

export function Card({ divida, index }) {
  const { handleDeleteTask } = useAuth();

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

  const bg = useColorModeValue("gray.100", "gray.900");
  const bgCondition = isPaid ? "green.100" : isOld ? "red.100" : bg;
  const color = useColorModeValue("gray.700", "gray.200");
  const colorCondition = isPaid ? "green.500" : isOld ? "red.500" : color;

  return (
    <Flex
      key={index}
      flexDir="column"
      borderRadius={8}
      color={colorCondition}
      bg={bgCondition}
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
      {divida.shared && divida.sharedBy && (
        <Text
          fontSize="sm"
          fontWeight="bold"
          letterSpacing="tight"
          color="blue.500"
          position="absolute"
          top="1"
          left="4"
        >
          Divida compartilhada de {divida.sharedBy}
        </Text>
      )}

      {divida.shared && !divida.sharedBy && (
        <Text
          fontSize="sm"
          fontWeight="bold"
          letterSpacing="tight"
          color="blue.500"
          position="absolute"
          top="1"
          left="4"
        >
          Divida compartilhada
        </Text>
      )}

      <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
        {divida.name}
      </Text>
      <Text fontSize="xl" letterSpacing="tight" color="red.500">
        {formatPrice(divida.value)}
      </Text>
      <Text>
        de{" "}
        {format(new Date(divida.date), "dd 'de' MMMM 'de' yyyy", {
          locale: ptBR,
        })}
      </Text>
      <Text>
        à{" "}
        {format(
          new Date(divida.arrayParcelas[divida.arrayParcelas.length - 1].date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: ptBR,
          }
        )}
      </Text>

      <Modal divida={divida} />
      <Flex mt="8" justify="flex-end" align="center" gap={5}>
        <SharedAlert divida={divida} />

        <AlertDelete
          divida={divida}
          handleDeleteTask={() => handleDeleteTask(divida.id)}
        />
      </Flex>
    </Flex>
  );
}
