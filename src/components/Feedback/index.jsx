import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Switch,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { VscFeedback } from "react-icons/vsc";
import { MdPhotoCamera } from "react-icons/md";
import html2canvas from "html2canvas";

export function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [open, setOpen] = useState(false);
  const [screenshot, setScreenshot] = useState("");

  const handleSubmit = () => {
    // Lógica para enviar o feedback
    // Aqui você pode enviar o feedback para um servidor, um banco de dados, etc.

    // Reinicializa o campo de feedback
    setFeedback("");
  };

  async function handleTakeScreenshot() {
    const canvas = await html2canvas(document.body, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      logging: true,
      scrollX: 0,
      scrollY: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      x: 0,
      y: 0,
    });

    const base64image = canvas.toDataURL("image/png");

    setScreenshot(base64image);
  }

  console.log(screenshot);

  return (
    <>
      <Flex
        w={14}
        h={14}
        bg={useColorModeValue("gray.100", "gray.900")}
        position="fixed"
        bottom={4}
        right={4}
        borderRadius="full"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
      >
        <Icon as={VscFeedback} w={8} h={8} onClick={() => setOpen(!open)} />
        {open && (
          <Box
            position="absolute"
            bottom={"5rem"}
            right={0}
            w={64}
            p={4}
            bg={useColorModeValue("gray.100", "gray.900")}
            borderRadius="md"
            boxShadow="md"
            _after={{
              content: '""',
              position: "absolute",
              bottom: -3,
              right: 4,
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid white",
            }}
          >
            <Box mb={4}>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                  Enviar printscreen
                </FormLabel>
                <Switch id="email-alerts" />
              </FormControl>
            </Box>
            <Box display={"flex"} flexDir="column">
              <Textarea
                placeholder="Digite seu feedback..."
                onChange={(e) => setFeedback(e.target.value)}
                value={feedback}
                size="lg"
                mb={4}
                resize="none"
              />

              <Flex alignItems="center" justifyContent="space-between">
                {screenshot && (
                  <Box
                    w={10}
                    h={7}
                    bg="gray.100"
                    borderRadius="md"
                    boxShadow="md"
                  >
                    <Image src={screenshot} w={10} h={7} />
                  </Box>
                )}
                <Button
                  alignSelf="flex-end"
                  colorScheme="blue"
                  alignItems="center"
                  justifyContent="center"
                  mb={4}
                  onClick={() => {
                    handleTakeScreenshot();
                  }}
                >
                  <Icon as={MdPhotoCamera} />
                </Button>
              </Flex>

              <Button colorScheme="blue" onClick={handleSubmit} mb={4}>
                Enviar
              </Button>
            </Box>
          </Box>
        )}
      </Flex>
    </>
  );
}
