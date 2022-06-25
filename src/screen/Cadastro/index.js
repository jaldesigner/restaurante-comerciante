import { View, Text, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

import Estilo from '../../Style/Estilo';
import { Btn2, Card } from '../../components';

export default function Cadastro({navigation}) {
  
  
    return (
      <SafeAreaView>
        <Card titulo="Cadastro de Produtos">
          <View style={Estilo.boxNeutro}>
            <Btn2 txt="Prato" fncClique={() => { navigation.navigate('CadastroPrato') }} />
          </View>
          <View style={Estilo.boxNeutro}>
            <Btn2 txt="Acompanhamento" fncClique={() => { navigation.navigate('CadastroAcompanhamento') }} />
          </View>
          <View style={Estilo.boxNeutro}>
            <Btn2 txt="Valores" fncClique={() => { navigation.navigate('CadastroValres') }} />
          </View>
          <View style={Estilo.boxNeutro}>
            <Btn2 txt="Medidas" fncClique={() => { navigation.navigate('CadastroMedidas') }} />
          </View>
        </Card>
      </SafeAreaView>
    );
}