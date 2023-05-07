import { ChakraProvider } from "@chakra-ui/react";
import { AppRoutes } from "./Router";
import { AuthProvider } from "./contexts/AuthContext";
import { theme } from "./theme/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
