import React, { useState, useContext } from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import INF from '../../config';
import { Btn1 } from '../../components';
import Estilo from '../../Style/Estilo';

import {AuthContext} from '../../contexts/auth';

const INFO = INF();

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const {cadastrarUsuario} = useContext(AuthContext);
  const {entrar} = useContext(AuthContext);

  function cad(){
    cadastrarUsuario('jalinittrader@gmail.com', 'vidaloka', 'Jonas', '1');
  }

  function logar(){
    entrar(email, senha);
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
              logar();
            }} txt='Entrar' />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}