import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';

import Estilo from '../../Style/Estilo';
import { Btn2, Card } from '../../components';

import { CTX_SelecaoPrato } from '../../contexts';

export default function Cadastro({ navigation }) {
  const [ctxSelecaoPrato, setCtxSelecaoPrato] = useContext(CTX_SelecaoPrato);

  function Mostrar() {
    const mst = ctxSelecaoPrato.map((item, index) => {
      const mapValor = item.tamanho_valor.map((i, ind) => {
        return (
          <View kay={ind}>
            <Text style={Estilo.txtLinkPositivo}>{i.medida} = {i.valor}</Text>
          </View>
        );
      });
      return (
        <View key={index}>
          <View>
            <Text style={Estilo.H2}>Prato:</Text>
            <Text style={Estilo.txtLinkPositivo}>{item.prato}</Text>
          </View>
          <View>
            <Text style={Estilo.H2}>Acompanhamento:</Text>
            <Text style={Estilo.txtLinkPositivo}>{item.acompanhamento}</Text>
          </View>
          <View>
            <Text style={Estilo.H2}>Medida/Valor:</Text>
            {mapValor}
          </View>
          <View style={Estilo.Dividir} />
        </View>
      );
    })
    return mst;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Card titulo="Cadastro de Produtos">
          <View style={Estilo.boxNeutro}>
            <Btn2 txt="Prato" fncClique={() => { navigation.navigate('CadastroPrato') }} />
          </View>
          <View style={Estilo.boxNeutro}>
            <Btn2 txt="Acompanhamento" fncClique={() => { navigation.navigate('CadastroAcompanhamento') }} />
          </View>
          <View style={Estilo.boxNeutro}>
            <Btn2 txt="Valores" fncClique={() => { navigation.navigate('CadastroValores') }} />
          </View>
          <View style={Estilo.boxNeutro}>
            <Btn2 txt="Medidas" fncClique={() => { navigation.navigate('CadastroMedidas') }} />
          </View>
        </Card>
        <Card>
          {Mostrar()}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}