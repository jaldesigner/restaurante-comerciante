import { View, Text, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Estilo from '../../Style/Estilo';

export default function Dwr(props) {
  return (
    <View style={Estilo.ContainerGeral}>
      <View style={Estilo.ItemCenter}>
        <Text style={Estilo.H2}>ADM Painel</Text>
      </View>
      <View style={Estilo.Dividir} />
      <View>
      
      </View>
    </View>
  )
}