import { View, Text } from 'react-native';
import React, {useState} from 'react';
import firebase from '../services/firebaseConnect';
import INF from '../config/index';

const pathDb = firebase.firestore().collection('Restaurante').doc(INF().ID_APP);

export const CadastroDePrato = async (nome_prato,url_img, UID) => {
    await pathDb.collection('Pratos').doc().set({
        UID: UID,
        nome_prato: nome_prato,
        URL_IMG: url_img,
    }).catch((error) =>{
        alert(error);
    })
}