import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import { getDividasByUser } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const [dividas, setDividas] = useState([]);

  console.log(user);

  async function login(data) {
    console.log(data);

    try {
      const user = await auth.signInWithEmailAndPassword(
        data.email,
        data.password
      );
      setUser(user.user._delegate);
      setIsAuthenticated(true);

      localStorage.setItem("user", JSON.stringify(user.user._delegate));
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setUser(null);
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setUser(null);
    auth.signOut();
    localStorage.removeItem("user");
  }

  async function getDividas() {
    console.log("user", user.uid);
    const allDividas = await getDividasByUser(user.uid);

    return allDividas;
  }

  useEffect(() => {
    if (user) {
      getDividas();
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user._delegate);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, handleLogout, user, getDividas }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
