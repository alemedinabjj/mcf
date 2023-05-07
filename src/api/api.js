import { auth } from "../config/firebaseConfig";
import { db } from "../config/firebaseConfig";

async function signUpWithEmailAndPasswordAndName(email, senha, displayName) {
  try {
    const resultado = await auth.createUserWithEmailAndPassword(email, senha);
    // Se o usuário for criado com sucesso, atualize o displayName
    await resultado.user.updateProfile({
      displayName: displayName,
    });
    // Log para depuração
    console.log("O usuário criado foi: ", resultado.user);
    return resultado;
  } catch (error) {
    // Se ocorrer um erro ao criar o usuário, o erro será capturado aqui
    console.error(error);
    return null;
  }
}

async function signInWithEmailAndPassword(email, senha) {
  try {
    const resultado = await auth.signInWithEmailAndPassword(email, senha);
    console.log(resultado);
    return resultado;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function logout() {
  try {
    const resultado = await auth.signOut();
    console.log(resultado);
    return resultado;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function addDivida(userId, newDivida) {
  try {
    const dividaRef = db
      .collection("dividas")
      .doc(userId)
      .collection("userDividas")
      .doc();

    const newDividaFirebase = {
      ...newDivida,
      id: dividaRef.id,
    };

    console.log("newDividaFirebase:", newDividaFirebase);

    await dividaRef.set(newDividaFirebase);

    console.log("Nova dívida adicionada com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar nova dívida:", error);
  }
}

async function getDividasByUser(userId) {
  try {
    const userDividasRef = db
      .collection("dividas")
      .doc(userId)
      .collection("userDividas");
    const querySnapshot = await userDividasRef.get();

    console.log("querySnapshot:", querySnapshot);
    const dividas = [];

    querySnapshot.forEach((doc) => {
      dividas.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    console.log("Dívidas do usuário:", dividas);

    return dividas;
  } catch (error) {
    console.error("Erro ao buscar dívidas do usuário:", error);
  }
}

async function deleteDivida(userId, dividaId) {
  try {
    const dividaRef = db
      .collection("dividas")
      .doc(userId)
      .collection("userDividas");

    const querySnapshot = await dividaRef.get();

    querySnapshot.forEach((doc) => {
      if (doc.id === dividaId) {
        doc.ref.delete();
        console.log("Dívida deletada com sucesso!");
      }
    });
  } catch (error) {
    console.error("Erro ao deletar dívida:", error);
  }
}

export {
  signUpWithEmailAndPasswordAndName,
  signInWithEmailAndPassword,
  logout,
  addDivida,
  getDividasByUser,
  deleteDivida,
};
