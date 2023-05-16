import { Flex, Input, Text, useColorModeValue } from "@chakra-ui/react";
import { formatPrice } from "../../../utils/formatPrice";

export function PerHour({
  registerSalaryHour,
  setRegisterSalaryHour,
  salaryTotal,
}) {
  return (
    <>
      <h1>Quanto você ganha por hora?</h1>
      <Text
        as="span"
        fontSize="sm"
        color={useColorModeValue("gray.600", "gray.300")}
      >
        Digite o valor que você ganha por hora e quantas horas você trabalha por
        dia
      </Text>

      <Flex flexDir="column" w="100%" gap={2} alignItems="flex-start" mt="1rem">
        <Input
          placeholder="Valor por hora"
          type="number"
          onChange={(e) => {
            setRegisterSalaryHour({
              ...registerSalaryHour,
              valueHour: e.target.value,
            });
          }}
        />
        <Input
          placeholder="Horas trabalhadas por dia"
          type="number"
          onChange={(e) => {
            setRegisterSalaryHour({
              ...registerSalaryHour,
              hoursWorked: e.target.value,
            });
          }}
        />
        <Input
          placeholder="Dias trabalhados no mês"
          type="number"
          onChange={(e) => {
            setRegisterSalaryHour({
              ...registerSalaryHour,
              daysWorked: e.target.value,
            });
          }}
        />

        {!!salaryTotal && (
          <Text
            as="span"
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.300")}
          >
            Seu salário é de {salaryTotal && formatPrice(salaryTotal)}
          </Text>
        )}
      </Flex>
    </>
  );
}
