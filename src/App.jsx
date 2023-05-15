import {
  ChakraProvider,
  ColorModeProvider,
  FormControl,
  FormLabel,
  Icon,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import { AppRoutes } from "./Router";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { theme } from "./theme/theme";
import { Header } from "./components/Header";
import { Background } from "./global/Background";
import { Feedback } from "./components/Feedback";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider>
        <Background />
        <Feedback />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
