import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { useAuth } from "./contexts/AuthContext";
import { DividaCompartilhada } from "./pages/DividaCompartilhada";
import { Header } from "./components/Header";

export const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {user && <Header />}
      <Routes>
        <Route
          path={"/dividas/:userid"}
          element={user ? <DividaCompartilhada /> : <Login />}
        />
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};
