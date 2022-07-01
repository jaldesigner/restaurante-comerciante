import { View, Text, SafeAreaView, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Btn2, Card } from '../../components';
import { CadastroDePrato } from '../../functions/cadastro_pratos';
import Estilo from '../../Style/Estilo';

//UID
const UID = (+new Date).toString(36);

export default function CadastroPrato() {

  const [prato, setPrato] = useState('');
  const [imgPrato, setImgPrato] = useState('');

  return (
    <SafeAreaView>
      <Card titulo="Cad. Prato" >
        <View>
          <View>
            <Text style={Estilo.H3}>Nome do prato</Text>
            <TextInput value={prato} onChangeText={prato => setPrato(prato)} style={Estilo.boxInputText}
              placeholder="Exp.: Bife com fritas"
              placeholderTextColor='#6C6D80' />
          </View>
          <View>
            <Text style={Estilo.H3}>Imagem</Text>
            <TextInput style={Estilo.boxInputText}
              value={imgPrato}
              onChangeText={imgPrato => setImgPrato(imgPrato)}
              placeholder="Imagem"
              placeholderTextColor='#6C6D80' />
          </View>
          <View style={Estilo.boxNeutro}>
            <Btn2 fncClique={() => {
              CadastroDePrato(prato, imgPrato, UID);
              setPrato('');
              setImgPrato('');
            }} txt='Cadastrar' />
          </View>
        </View>
      </Card>
      <Card titulo="Pratos Cadastrados">
        <View>
          <View><Text>Bife com fritas</Text></View>
          <View><Pressable><Text>Edit</Text></Pressable></View>
          <View><Pressable><Text>Del</Text></Pressable></View>
        </View>
      </Card>
    </SafeAreaView>
  );
}