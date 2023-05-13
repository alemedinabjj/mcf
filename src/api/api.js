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

    await db.collection("users").doc(uid).set({
      ...user,
      email: formattedEmail,
      displayName: displayName,
      photoURL: photoURL,
    });
    console.log("Usuário inserido no banco de dados");
  } catch (error) {
    console.error(error);
  }
}

async function signInWithEmailAndPassword(email, senha) {
  try {
    const formattedEmail = email.toLowerCase().trim();

    const resultado = await auth.signInWithEmailAndPassword(formattedEmail, senha);
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
      console.log("Imagem do usuário atualizada com sucesso!");
      await auth.currentUser.updateProfile({
        photoURL: downloadURL
      });
      await auth.currentUser.reload();
      console.log("Dados do usuário atualizados com sucesso!");
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

    console.log(`Dívida compartilhada com sucesso com o usuário ${email}!`);

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

    console.log("Dívidas compartilhadas com o usuário:", dividas);

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
        console.log("Parcela encontrada!,", updatedParcela);
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

    console.log("Divida compartilhada atualizada com sucesso!");

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
};
