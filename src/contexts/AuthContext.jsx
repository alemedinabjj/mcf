import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import {
  getDividasByUser,
  getDividasSharedByUser,
  getInfoUserByCollection,
} from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sharedDividas, setSharedDividas] = useState([]);
  const [user, setUser] = useState([]);
  const [infoUser, setInfoUser] = useState(0);

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

  async function getDividas() {
    const allDividas = await getDividasByUser(user.uid);
    const sharedDividas = await getDividasSharedByUser(user.uid);
    const getInfoUser = await getInfoUserByCollection(user.uid);

    setSharedDividas(sharedDividas);

    setDividas(allDividas);

    setInfoUser(getInfoUser);

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
        sharedDividas,
        setSharedDividas,
        infoUser,
        setDividas,
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
