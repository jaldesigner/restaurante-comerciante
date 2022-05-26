import { View, Text, SafeAreaView, } from 'react-native';
import React from 'react';
import Estilo from '../../Style/Estilo';
import { Card } from '../../components';

export default function MontarCardapio({ navigation }) {
  return (
    <SafeAreaView>
      <Card titulo="Montar Cardápio">
        <View>
          <View>
            <Text>Este é o conteúdo do carde com título</Text>
          </View>
        </View>
      </Card>
    </SafeAreaView>
  )
}