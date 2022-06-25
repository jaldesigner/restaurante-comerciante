import { View, Text, Alert, SafeAreaView } from 'react-native';
import React,{useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DadosApp from '../../config';
import Estilo from '../../Style/Estilo';
import { Btn2, Card } from '../../components';

export default function CadastroPrato() {
  return (
    <SafeAreaView>
      <Card>
        <View><Text>Cadastro de Prato</Text></View>
      </Card>
    </SafeAreaView>
  );
}