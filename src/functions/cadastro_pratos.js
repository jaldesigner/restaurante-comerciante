import { View, Text } from 'react-native';
import React, { useState } from 'react';
import firestore from "@react-native-firebase/firestore";
import INF from '../config/index';

const pathDb = firestore().collection('Restaurante').doc(INF().ID_APP);

export const CadastroDePrato = async (nome_prato, url_img, UID) => {
    await pathDb.collection('Pratos').doc(UID).set({
        UID: UID,
        nome_prato: nome_prato,
        URL_IMG: url_img,
    }).catch((error) => {
        alert(error);
    })
}

export const DeletaPrato = async (UIDPRATO) => {
    await pathDb.collection('Pratos').doc(UIDPRATO).delete().then(()=>{
        alert('Prato deletado!')
    });
}

export const EditaPrato = async (UIDPRATO,obj) => {
    await pathDb.collection('Pratos').doc(UIDPRATO).update(obj).then(()=>{
        alert('Editado com sucesso!!')
    });
}