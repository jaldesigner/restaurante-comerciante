import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Estilo from '../../Style/Estilo';
import {Card, Btn2} from '../../components';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import {CTX_SelecaoPrato} from '../../contexts';
import INF from '../../config/';
import {MoedaReal} from '../../functions/mascaras';

const pathDb = firestore().collection('Restaurante').doc(INF().ID_APP);

export default function MontarCardapio({navigation}) {
  const [ctxSelecaoPrato, setCtxSelecaoPrato] = useContext(CTX_SelecaoPrato);
  const [prato, setPratos] = useState([]);
  const [valores, setValores] = useState([]);
  const [medidas, setMedidas] = useState([]);
  const [acompanhamento, setAcampanhamento] = useState([]);
  const [arrayValores, setArrayValores] = useState([]);
  const [selecaoPickerPrato, setSelecaoPickerPrato] = useState('');
  const [selecaoPickerAcompanhamento, setSelecaoPickerAcompanhamento] = useState('');
  const [atualiza, setAtualiza] = useState(0);

  useEffect(() => {
    const listaPratos = async () => {
      const l = await pathDb.collection('Pratos').orderBy('nome_prato').get();
      setPratos(l.docs);
    };
    const listaValores = async () => {
      const l = await pathDb.collection('Valores').orderBy('valor').get();
      setValores(l.docs);
    };
    const listaMedidas = async () => {
      const l = await pathDb.collection('Medidas').orderBy('medida').get();
      setMedidas(l.docs);
    };
    const listaAcompanhamentos = async () => {
      const l = await pathDb.collection('Acompanhamento').orderBy('acompanhamento').get();
      setAcampanhamento(l.docs);
    };

    listaAcompanhamentos();
    listaMedidas();
    listaValores();
    listaPratos();
    setAtualiza(0);
  }, [atualiza]);

  const ValorPickerPratos = () => {
    const lp = prato.map((prato, index) => {
      return (
        <Picker.Item
          key={index}
          label={prato.data().nome_prato}
          value={prato.data().nome_prato}
        />
      );
    });

    return lp;
  };

  const ValorPickerAcompanhamento = () => {
    const lp = acompanhamento.map((acmp, index) => {
      return (
        <Picker.Item
          key={index}
          label={acmp.data().acompanhamento}
          value={acmp.data().acompanhamento}
        />
      );
    });

    return lp;
  };

  const ValorPickerValores = () => {
    const lv =valores.map((valores, index) => {
      return (
        <Picker.Item
          key={index}
          label={MoedaReal(valores.data().valor)}
          value={valores.data().valor}
        />
      );
    });

    return lv;
  };

  const PickerTamanhoValor = () => {
    const LTamanho = medidas.map((med, index) => {
      return (
        <View key={index} style={Estilo.boxNeutro}>
          <View style={Estilo.BoxRow}>
            <View style={Estilo.boxColunaSelecao1}>
              <Text style={Estilo.TxtComum}>{med.data().medida}</Text>
            </View>

            <View style={Estilo.boxColunaSelecao2}>
              <Picker
                mode="dropdown"
                dropdownIconColor="#2D2D3F"
                style={{backgroundColor: '#fff'}}
                onValueChange={selecaoPickerValor => {
                  arrayValores[index] = {
                    medida: med.data().medida,
                    valor: selecaoPickerValor,
                    indice: index,
                  };

                  setArrayValores(arrayValores);
                  //console.log(arrayValores);
                  setAtualiza(1);
                }}
                selectedValue={
                  arrayValores[index] != undefined
                    ? arrayValores[index].valor
                    : 'Selecione o valor'
                }>
                <Picker.Item label="Selecione o valor" value="" />
                {ValorPickerValores()}
                <Picker.Item label="Desativar" value={null} />
              </Picker>
            </View>
          </View>
        </View>
      );
    });

    return LTamanho;
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Card titulo="Montar Cardápio">
          <View>
            <View>
              <View>
                <View style={Estilo.boxNeutro}>
                  <Text style={Estilo.TxtComum}>Selecione o prato</Text>
                </View>
                <Picker
                  mode="dropdown"
                  dropdownIconColor="#2D2D3F"
                  style={{backgroundColor: '#fff'}}
                  selectedValue={selecaoPickerAcompanhamento}
                  onValueChange={selecaoPickerAcompanhamento => {
                    setSelecaoPickerAcompanhamento(selecaoPickerAcompanhamento);
                  }}>
                  <Picker.Item label="Nenhum" value="" />
                  {ValorPickerPratos()}
                </Picker>
              </View>

              <View>
                <View style={Estilo.boxNeutro}>
                  <Text style={Estilo.TxtComum}>Selecione o acompanhamento</Text>
                </View>
                <Picker
                  mode="dropdown"
                  dropdownIconColor="#2D2D3F"
                  style={{backgroundColor: '#fff'}}
                  selectedValue={selecaoPickerPrato}
                  onValueChange={selecaoPickerPrato => {
                    setSelecaoPickerPrato(selecaoPickerPrato);
                  }}>
                  <Picker.Item label="Nenhum" value="" />
                  {ValorPickerAcompanhamento()}
                </Picker>
              </View>

              <View style={Estilo.Dicvvidir} />
              <View>
                <View style={Estilo.BoxRow}>
                  <View style={Estilo.boxColunaSelecao1}>
                    <Text style={Estilo.H2}>Tamanho:</Text>
                  </View>
                  <View style={Estilo.boxColunaSelecao2}>
                    <Text style={Estilo.H2}>Valor:</Text>
                  </View>
                </View>
                {PickerTamanhoValor()}
              </View>
            </View>
            <View style={Estilo.boxNeutro}>
              <Btn2
                txt="Salvar"
                fncClique={() => {
                  setCtxSelecaoPrato({
                    
                  });
                  //navigation.navigate('Cadastro');
                }}
              />
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
