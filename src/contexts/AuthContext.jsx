import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import {
  deleteDivida,
  getDividasByUser,
  getDividasSharedByUser,
} from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const [dividas, setDividas] = useState([]);

  async function login(data) {
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

  function handleDeleteTask(dividaId) {
    deleteDivida(user?.uid, dividaId).then(() => {
      getDividas().then((data) => {
        setDividas(data);
      });
    }),
      console.log("dividaId", dividaId);
  }

  async function getDividas() {
    const allDividas = await getDividasByUser(user.uid);
    const sharedDividas = await getDividasSharedByUser(user.uid);

    setDividas([...allDividas, ...sharedDividas]);

    return [...allDividas, ...sharedDividas];
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

  useEffect(() => {
    if (user) {
      getDividas().then((data) => {
        setDividas(data);
      });
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        handleLogout,
        user,
        getDividas,
        dividas,
        setDividas,
        handleDeleteTask,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
