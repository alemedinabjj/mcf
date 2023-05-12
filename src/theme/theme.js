import { extendTheme } from "@chakra-ui/react";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const light = {
  color: "gray.800",
  bg: "gray.100",
  borderColor: "gray.300",
  placeholderColor: "gray.500",
};

const dark = {
  color: "gray.100",
  bg: "gray.900",
  borderColor: "gray.600",
  placeholderColor: "gray.400",
};

//usage example: <Box bg={useColorModeValue('red.200', 'red.900')} />

export const theme = extendTheme({
  config,
  colors: {
    light,
    dark,
  },

  //usage example: <Box bg={useColorModeValue('red.200', 'red.900')} />

  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});
