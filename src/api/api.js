import {
  auth,
  githubAuthProvider,
  googleAuthProvider,
} from "../config/firebaseConfig";
import { db, storage } from "../config/firebaseConfig";

async function signUpWithEmailAndPasswordAndName(email, senha, displayName) {
  try {
    const resultado = await auth.createUserWithEmailAndPassword(email, senha);
    // Se o usuário for criado com sucesso, atualize o displayName
    await resultado.user.updateProfile({
      displayName: displayName,
    });
    // Log para depuração
    console.log("O usuário criado foi: ", resultado.user);
    // Insere o usuário na tabela "user"
    await inserirUsuarioNoBancoDeDados(
      resultado.user.uid,
      email,
      displayName,
      resultado.user.photoURL
    );
    return resultado;
  } catch (error) {
    // Se ocorrer um erro ao criar o usuário, o erro será capturado aqui
    console.error(error);
    return null;
  }
}

async function inserirUsuarioNoBancoDeDados(uid, email, displayName, photoURL) {
  try {
    await db.collection("users").doc(uid).set({
      email: email,
      displayName: displayName,
      photoURL: null,
    });
    console.log("Usuário inserido no banco de dados");
  } catch (error) {
    console.error(error);
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

async function signInWithGoogle() {
  try {
    const resultado = await auth.signInWithPopup(googleAuthProvider);
    console.log(resultado);
    await inserirUsuarioNoBancoDeDados(
      resultado.user.uid,
      resultado.user.email,
      resultado.user.displayName,
      resultado.user.photoURL
    );
    return resultado;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function signInWithGithub() {
  try {
    const resultado = await auth.signInWithPopup(githubAuthProvider);
    console.log(resultado);
    await inserirUsuarioNoBancoDeDados(
      resultado.user.uid,
      resultado.user.email,
      resultado.user.displayName,
      resultado.user.photoURL
    );
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

    const newParcelas = newDivida.arrayParcelas.map((parcela) => {
      return { ...parcela, pago: false }; // adiciona a propriedade "pago" a cada parcela com o valor inicial "false"
    });

    const newDividaFirebase = {
      ...newDivida,
      id: dividaRef.id,
      arrayParcelas: newParcelas,
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

    const sharedDividasRef = db
      .collection("dividas")
      .doc(userId)
      .collection("sharedDividas");

    const querySnapshot = await dividaRef.get();
    const sharedQuerySnapshot = await sharedDividasRef.get();

    sharedQuerySnapshot.forEach((doc) => {
      if (doc.id === dividaId) {
        doc.ref.delete();
        console.log("Dívida compartilhada deletada com sucesso!");
      }
    });

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

async function updateParcela(dividaId, updatedParcela) {
  try {
    const dividaRef = db
      .collection("dividas")
      .doc(auth.currentUser.uid)
      .collection("userDividas")
      .doc(dividaId);

    const dividaDoc = await dividaRef.get();

    const divida = dividaDoc.data();

    console.log("divida:", divida);

    const parcelas = divida.arrayParcelas.map((parcela) => {
      if (parcela.id === updatedParcela.id) {
        return updatedParcela;
      } else {
        return parcela;
      }
    });

    const dividaPaga = parcelas.every((parcela) => parcela.pago === true);

    if (dividaPaga) {
      return await dividaRef.update({
        arrayParcelas: parcelas,
        paid: true,
      });
    } else {
      return await dividaRef.update({
        arrayParcelas: parcelas,
        paid: false,
      });
    }
  } catch (error) {
    console.error("Erro ao atualizar parcela:", error);
  }

  console.log("Parcela atualizada com sucesso!");

  const newDividaDoc = await dividaRef.get();
  const newDivida = newDividaDoc.data();
  return newDivida;
}

async function updateUser(userId, file) {
  const userRef = db.collection("users").doc(userId);

  const storageRef = storage.ref().child(`users/${userId}/profilePicture.jpg`);

  try {
    const snapshot = await storageRef.put(file);
    const downloadURL = await snapshot.ref.getDownloadURL();
    await userRef.set({ photoURL: downloadURL }, { merge: true });
    console.log("Imagem do usuário atualizada com sucesso!");
    await auth.currentUser.updateProfile({
      photoURL: downloadURL,
    });
    await auth.currentUser.reload();
    console.log("Dados do usuário atualizados com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar imagem do usuário:", error);
  }
}

async function shareDivida(dividaId, email) {
  try {
    const dividaRef = db
      .collection("dividas")
      .doc(auth.currentUser.uid)
      .collection("userDividas")
      .doc(dividaId);

    const dividaDoc = await dividaRef.get();

    if (!dividaDoc.exists) {
      console.error("Dívida não encontrada!");
      return;
    }

    const divida = dividaDoc.data();

    const user = await db.collection("users").where("email", "==", email).get();

    if (user.empty) {
      console.error("Usuário não encontrado!");
      return;
    }

    const userId = user.docs[0].id;

    await db
      .collection("dividas")
      .doc(userId)
      .collection("sharedDividas")
      .doc(dividaId)
      .set({
        ...divida,
        sharedBy: auth.currentUser.displayName,
      });

    console.log(`Dívida compartilhada com sucesso com o usuário ${email}!`);

    await dividaRef.update({
      shared: true,
      sharedWith: email,
    });
  } catch (error) {
    console.error("Erro ao compartilhar dívida:", error);
  }
}

async function getDividasSharedByUser(userId) {
  try {
    const sharedDividasRef = db
      .collection("dividas")
      .doc(userId)
      .collection("sharedDividas");

    const querySnapshot = await sharedDividasRef.get();

    const dividas = [];

    querySnapshot.forEach((doc) => {
      dividas.push({
        id: doc.id,
        shared: true,
        sharedBy: doc.data().sharedBy,
        ...doc.data(),
      });
    });

    console.log("Dívidas compartilhadas com o usuário:", dividas);

    return dividas;
  } catch (error) {
    console.error(
      "Erro ao buscar dívidas compartilhadas com o usuário:",
      error
    );
  }
}

export {
  signUpWithEmailAndPasswordAndName,
  signInWithEmailAndPassword,
  logout,
  addDivida,
  getDividasByUser,
  deleteDivida,
  updateParcela,
  signInWithGoogle,
  signInWithGithub,
  updateUser,
  shareDivida,
  getDividasSharedByUser,
};
