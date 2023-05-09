import { ChakraProvider } from "@chakra-ui/react";
import { AppRoutes } from "./Router";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { theme } from "./theme/theme";
import { Header } from "./components/Header";

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
