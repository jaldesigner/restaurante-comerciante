import firestore from "@react-native-firebase/firestore";
import INF from '../config/index';

const pathDb = firestore().collection('Restaurante').doc(INF().ID_APP);

/* CRUD teste do App */

export const Adicionar = async (colecao, caminho, obj,txtAlerta) => {
    await pathDb.collection(colecao).doc(caminho).set(obj).then(()=>{
        alert(txtAlerta);
    }).catch((erro) => {
        alert("Ouve um erro - " + erro);
    })
}

export const Deletar = async (colecao,caminho,txtAlerta) => {
    await pathDb.collection(colecao).doc(caminho).delete().then(() => {
        alert(txtAlerta);
    })
}
export const Atualizar = async (colecao,caminho,obj,txtAlerta) => {
    await pathDb.collection(colecao).doc(caminho).update(obj).then(() => {
        alert(txtAlerta);
    })
}


/* 
=============================================
Cadastro, exclusão e atualização de pratos
=============================================
*/

export const CadastroDePrato = async (nome_prato, url_img, UID) => {
    await pathDb.collection('Pratos').doc(UID).set({
        UID: UID,
        nome_prato: nome_prato,
        URL_IMG: url_img,
    }
    ).catch((error) => {
        alert(error);
    });
}

export const DeletaPrato = async (UIDPRATO) => {
    await pathDb.collection('Pratos').doc(UIDPRATO).delete().then(() => {
        alert('Prato deletado!' + UIDPRATO);
    });
}

export const EditaPrato = async (UIDPRATO, obj) => {
    await pathDb.collection('Pratos').doc(UIDPRATO).update(obj).then(() => {
        alert('Nome do prato editado com sucesso!!');
    }).catch(e => {
        alert(e);
    });
}
