import { Button, Flex, Grid, Input, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { formatPrice } from "../../utils/formatPrice";

export function RegisterSalary({ handleSalaryTotal }) {
  const [typeSalary, setTypeSalary] = React.useState("");
  const [registerSalaryHour, setRegisterSalaryHour] = React.useState({
    valueHour: "",
    hoursWorked: "",
    salaryTotal: "",
  });
  const [salaryTotal, setSalaryTotal] = React.useState(0);

  function calculateSalaryHour() {
    const { valueHour, hoursWorked, daysWorked } = registerSalaryHour;

    const salaryHour = valueHour * hoursWorked * daysWorked;

    console.log(salaryHour);

    setSalaryTotal(salaryHour);

    handleSalaryTotal(salaryHour);

    return salaryHour;
  }

  useEffect(() => {
    calculateSalaryHour();
  }, [registerSalaryHour]);

  return (
    <Flex flexDir="column" alignItems="flex-start" w="100%" gap={4}>
      <Flex flexDir="column" flex="1">
        <h1>Registre seu salário</h1>

        <Text
          as="span"
          fontSize="sm"
          color={useColorModeValue("gray.600", "gray.300")}
        >
          Qual sua forma de pagamento?
        </Text>
      </Flex>
      <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={4}>
        <Text
          as="span"
          bg={useColorModeValue("gray.100", "gray.800")}
          p="2"
          borderRadius="md"
          textAlign="center"
          cursor="pointer"
          onClick={() => setTypeSalary("hour")}
          color={typeSalary === "hour" ? "yellow.500" : "gray.300"}
        >
          Por hora
        </Text>
        <Text
          as="span"
          bg={useColorModeValue("gray.100", "gray.800")}
          p="2"
          textAlign="center"
          borderRadius="md"
          cursor="pointer"
          onClick={() => setTypeSalary("month")}
          color={typeSalary === "month" ? "yellow.500" : "gray.300"}
        >
          Por mês
        </Text>
      </Grid>

      <Flex flexDir="column" flex="1">
        {typeSalary === "hour" ? (
          <>
            <h1>Quanto você ganha por hora?</h1>
            <Text
              as="span"
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.300")}
            >
              Digite o valor que você ganha por hora e quantas horas você
              trabalha por dia
            </Text>

            <Flex
              flexDir="column"
              w="100%"
              gap={2}
              alignItems="flex-start"
              mt="1rem"
            >
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
        ) : (
          <>
            <h1>Quanto você ganha por mês?</h1>
            <Text
              as="span"
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.300")}
            >
              Digite o valor que você ganha por mês
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
}
