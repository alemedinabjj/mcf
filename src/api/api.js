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
  const getUser = await db.collection("users").doc(uid).get();
  const user = getUser.data();

  try {
    const formattedEmail = email.toLowerCase().trim();

    await db
      .collection("users")
      .doc(uid)
      .set({
        ...user,
        email: formattedEmail,
        displayName: displayName,
        photoURL: photoURL,
      });
  } catch (error) {
    console.error(error);
  }
}

async function signInWithEmailAndPassword(email, senha) {
  try {
    const formattedEmail = email.toLowerCase().trim();

    const resultado = await auth.signInWithEmailAndPassword(
      formattedEmail,
      senha
    );
    return resultado;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function signInWithGoogle() {
  try {
    const resultado = await auth.signInWithPopup(googleAuthProvider);
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

    await dividaRef.set(newDividaFirebase);
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

    const dividas = [];

    querySnapshot.forEach((doc) => {
      dividas.push({
        id: doc.id,
        ...doc.data(),
      });
    });

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
      }
    });

    querySnapshot.forEach((doc) => {
      if (doc.id === dividaId) {
        doc.ref.delete();
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

  const newDividaDoc = await dividaRef.get();
  const newDivida = newDividaDoc.data();
  return newDivida;
}

async function updateUser(userId, file, salary) {
  const userRef = db.collection("users").doc(userId);

  const storageRef = storage.ref().child(`users/${userId}/profilePicture.jpg`);

  if (salary) {
    insertSalary(userId, salary);
  }

  try {
    //se tiver uma imagem, atualiza a imagem, se não deixar como está
    if (file) {
      const snapshot = await storageRef.put(file);
      const downloadURL = await snapshot.ref.getDownloadURL();
      await userRef.set({ photoURL: downloadURL }, { merge: true });
      await auth.currentUser.updateProfile({
        photoURL: downloadURL,
      });
      await auth.currentUser.reload();
    } else {
      console.log("Imagem do usuário não atualizada!");
    }
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

    const sharedLink = `http://localhost:5174/divida-compartilhada/${auth.currentUser.uid}/${dividaId}`;

    await db
      .collection("dividas")
      .doc(userId)
      .collection("sharedDividas")
      .doc(dividaId)
      .set({
        ...divida,
        sharedLink,
        sharedBy: auth.currentUser.displayName,
      });

    await dividaRef.update({
      ...divida,
      shared: true,
      sharedLink,
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

    return dividas;
  } catch (error) {
    console.error(
      "Erro ao buscar dívidas compartilhadas com o usuário:",
      error
    );
  }
}

async function updateSharedDivida(sharedDividaId, updatedParcela) {
  try {
    const sharedDividaRef = db
      .collection("dividas")
      .doc(auth.currentUser.uid)
      .collection("sharedDividas")
      .doc(sharedDividaId);

    const sharedDividaDoc = await sharedDividaRef.get();

    if (!sharedDividaDoc.exists) {
      console.error("Dívida compartilhada não encontrada!");
      return;
    }

    const sharedDivida = sharedDividaDoc.data();

    const parcelas = sharedDivida.arrayParcelas.map((parcela) => {
      if (parcela.id === updatedParcela.id) {
        return updatedParcela;
      } else {
        return parcela;
      }
    });

    const dividaPaga = parcelas.every((parcela) => parcela.pago === true);

    if (dividaPaga) {
      await sharedDividaRef.update({
        arrayParcelas: parcelas,
        pago: true,
      });
    } else {
      await sharedDividaRef.update({
        arrayParcelas: parcelas,
        pago: false,
      });
    }

    // Atualiza a cópia da divida do usuário com quem a divida foi compartilhada
    const dividaCompartilhadaRef = db
      .collection("dividasCompartilhadas")
      .doc(sharedDivida.usuarioId)
      .collection("userDividas")
      .doc(sharedDivida.dividaId);

    const dividaCompartilhadaDoc = await dividaCompartilhadaRef.get();

    if (!dividaCompartilhadaDoc.exists) {
      console.error("Dívida compartilhada não encontrada na cópia do usuário!");
      return;
    }

    const dividaCompartilhada = dividaCompartilhadaDoc.data();

    const parcelasCompartilhadas = dividaCompartilhada.arrayParcelas.map(
      (parcela) => {
        if (parcela.id === updatedParcela.id) {
          console.log(
            "Parcela encontrada na cópia do usuário!,",
            updatedParcela
          );
          return updatedParcela;
        } else {
          return parcela;
        }
      }
    );

    const dividaCompartilhadaPaga = parcelasCompartilhadas.every(
      (parcela) => parcela.pago === true
    );

    if (dividaCompartilhadaPaga) {
      await dividaCompartilhadaRef.update({
        arrayParcelas: parcelasCompartilhadas,
        pago: true,
      });
    } else {
      await dividaCompartilhadaRef.update({
        arrayParcelas: parcelasCompartilhadas,
        pago: false,
      });
    }

    console.log("Cópia da divida compartilhada atualizada com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar dívida compartilhada:", error);
  }
}

async function insertSalary(userId, salary) {
  try {
    const userRef = db.collection("users").doc(userId);

    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.error("Usuário não encontrado!");
      return;
    }

    const user = userDoc.data();

    if (user.salario) {
      await userRef.update({
        salario: salary,
      });
    } else {
      await userRef.set({ salario: salary }, { merge: true });
    }

    await auth.currentUser.reload();

    console.log("Salário inserido com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir salário:", error);
  }
}

async function getInfoUserByCollection(userId) {
  try {
    const userRef = db.collection("users").doc(userId);

    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.error("Usuário não encontrado!");
      return;
    }

    const user = userDoc.data();

    return user;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
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
  updateSharedDivida,
  insertSalary,
  getInfoUserByCollection,
};
