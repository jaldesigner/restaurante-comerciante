import React, { useState, useContext } from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import INF from '../../config';
import { Btn1 } from '../../components';
import Estilo from '../../Style/Estilo';

//context
import {AuthContext} from '../../contexts/auth';

const aut = auth();
const db = firestore();
const pathDb = db.collection('Restaurante').doc('IDUNICO');
const INFO = INF();

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const {user} = useContext(AuthContext);

  function nomeContext(){
    console.log(user.nome);
  }

  function GravarDados() {
    const userDoc = pathDb.collection("Login")
      .doc(email)
      .set({
        Usuario: email,
        Senha: senha
      });
  }

  function CriarUsuario() {
    aut.createUserWithEmailAndPassword(email, senha)
      .then(() => {
        alert('Usuário criado e logado com sucesso!');
      }).catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('E-mail já em uso!');
        }

        if (error.code === 'auth/invalid-email') {
          alert('Email inválido!');
        }
      })
  }

  return (
    <SafeAreaView>
      <View style={Estilo.ConteinerCenter}>
        {/** 
         * Título
        */}
        <View style={Estilo.ItemCenter}>
          <Text style={Estilo.H1}>ADMIN</Text>
          <Text style={Estilo.H3}>Painel</Text>
        </View>
        <View>
          <View>
            <Text style={Estilo.H3}>Email</Text>
            <TextInput style={Estilo.boxInputText} onChangeText={email => {
              setEmail(email);
            }} value={email} placeholder="Digite seu Email" keyboardType='email-address' placeholderTextColor='#6C6D80' />
          </View>
          <View>
            <Text style={Estilo.H3}>Senha</Text>
            <TextInput style={Estilo.boxInputText}
              onChangeText={senha => setSenha(senha)}
              value={senha} secureTextEntry={true}
              placeholder="Digite sua senha" placeholderTextColor='#6C6D80' />
          </View>
          <View style={Estilo.boxNeutro}>
            <Btn1 fncClique={() => {
              //navigation.navigate('Home');
              nomeContext();
            }} txt='Entrar' />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}