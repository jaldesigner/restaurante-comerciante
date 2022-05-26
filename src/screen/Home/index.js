import { View, Text, Button, SafeAreaView } from 'react-native';
import React from 'react';
import Estilo from '../../Style/Estilo';
import { Btn2, Card } from '../../components';

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={Estilo.ContainerGeral}>
      <View style={Estilo.ConteinerCenter}>
        <Card>
          <View>
            <Text style={Estilo.H3}>Não há cardápio publicado  ainda.</Text>
            <Text style={Estilo.H3}>Clique abaixo para montar o cardápio do dia.</Text>
          </View>
          <View style={Estilo.boxNeutro}>
            <Btn2 txt="Montar Cardápio" fncClique={() => {
              navigation.navigate('MontarCardapio');
            }} />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  )
}