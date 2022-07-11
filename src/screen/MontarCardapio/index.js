import { View, Text, SafeAreaView, } from 'react-native';
import React from 'react';
import Estilo from '../../Style/Estilo';
import { Card, Btn2 } from '../../components';

export default function MontarCardapio({ navigation }) {
  return (
    <SafeAreaView>
      <Card titulo="Montar Cardápio">
        <View>
          <View>
            <Text style={Estilo.TxtComum}>Este é o conteúdo do carde com título</Text>
          </View>
          <View style={Estilo.boxNeutro}>
            <Btn2 txt="Cadastrar" fncClique={()=>{
              navigation.navigate("Cadastro");
            }} />
          </View>
        </View>
      </Card>
    </SafeAreaView>
  )
}