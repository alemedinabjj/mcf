import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import {
  deleteDivida,
  getDividasByUser,
  getDividasSharedByUser,
  getInfoUserByCollection,
  updateUser,
} from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sharedDividas, setSharedDividas] = useState([]);
  const [user, setUser] = useState([]);
  const [infoUser, setInfoUser] = useState(0);
  const [userUpdate, setUserUpdate] = useState(false);

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
    const getInfoUser = await getInfoUserByCollection(user.uid);

    setSharedDividas(sharedDividas);

    setDividas(allDividas);

    setInfoUser(getInfoUser);

    setUserUpdate(true);

    console.log("loops ?");

    return allDividas;
  }

  async function handleEditUser(data, photo, salaryTotal) {
    await updateUser(user.uid, photo, salaryTotal);

    if (data.username) {
      await updateUser(user.uid, null, null, data.username);
    }

    await getDividas();
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
        sharedDividas,
        setSharedDividas,
        infoUser,
        handleEditUser,
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
