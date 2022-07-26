import { View, Text, SafeAreaView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Estilo from '../../Style/Estilo';
import { Card, Btn2 } from '../../components';
import firestore from "@react-native-firebase/firestore";
import { Picker } from '@react-native-picker/picker';
import { CTX_SelecaoPrato } from '../../contexts';
import INF from '../../config/';

const pathDb = firestore().collection('Restaurante').doc(INF().ID_APP);

export default function MontarCardapio({ navigation }) {

  const [ctxSelecaoPrato, setCtxSelecaoPrato] = useContext(CTX_SelecaoPrato);
  const [prato, setPratos] = useState([]);
  const [valores, setValores] = useState([]);
  const [medidas, setMedidas] = useState([]);
  const [selecaoPickerPrato, setSelecaoPickerPrato] = useState('');
  const [atualiza, setAtualiza] = useState(0);

  useEffect(() => {
    const listaPratos = async () => {
      const l = await pathDb.collection('Pratos').orderBy('nome_prato').get();
      setPratos(l.docs);
    }
    const listaValores = async () => {
      const l = await pathDb.collection('Valores').orderBy('valor').get();
      setValores(l.docs);
    }
    const listaMedidas = async () => {
      const l = await pathDb.collection('Medidas').orderBy('medida').get();
      setMedidas(l.docs);
    }

    listaMedidas();
    listaValores();
    listaPratos();
    setAtualiza(0);
  }, [atualiza]);

  const ValorPickerPratos = () => {
    const l = prato.map((prato, index) => {
      return <Picker.Item key={index} label={prato.data().nome_prato} value={prato.data().nome_prato} />;
    })

    return l;
  }

  const ValorPickerValores = () => {
    const l = valores.map((valores, index) => {
      return <Picker.Item key={index} label={valores.data().valor} value={valores.data().valor} />;
    })

    return l;
  }

  const ValorPickerMedidas = () => {
    const l = medidas.map((medidas, index) => {
      return <Picker.Item key={index} label={medidas.data().medida} value={medidas.data().medida} />;
    })

    return l;
  }


  const PickerTamanhoValor = () => {

    const lTamanho = medidas.map((med, index)=> {
      
    });

    return(
      <View style={Estilo.boxNeutro}>
                <View style={Estilo.BoxRow}>
                  {/* Coluna 1 */}
                  <View style={Estilo.boxColunaSelecao1}>
                    <Text style={Estilo.TxtComum}>Grande</Text>
                  </View>
                  {/* Coluna 2 */}
                  <View style={Estilo.boxColunaSelecao2}>
                    <Picker dropdownIconColor='#2D2D3F' style={{ backgroundColor: '#fff' }} selectedValue={prato} onValueChange={prato => { setPrato(prato) }}>
                      <Picker.Item label='Nenhum' value='' />
                      <Picker.Item label='R$14,56' value='14.56' />
                    </Picker>
                  </View>
                </View>
              </View>
    );
  }



  return (
    <SafeAreaView>
      <Card titulo="Montar Cardápio">
        <View>
          <View>
            {/*===================================================
            == Seleção de Prato
            ====================================================*/}

            <View>
              <View style={Estilo.boxNeutro}>
                <Text style={Estilo.TxtComum}>Selecione o prato</Text>
              </View>
              <Picker
                dropdownIconColor='#2D2D3F'
                style={{ backgroundColor: '#fff' }}
                selectedValue={selecaoPickerPrato}
                onValueChange={selecaoPickerPrato => {
                  setSelecaoPickerPrato(selecaoPickerPrato);
                }}>
                <Picker.Item label='Nenhum' value='' />
                {ValorPickerPratos()}
              </Picker>
            </View>

            {/*===================================================
            == Seleção de Valores e tamanho
            ====================================================*/}
            <View style={Estilo.Dividir} />
            <View>
              <View style={Estilo.BoxRow}>
                {/* Coluna 1 */}
                <View style={Estilo.boxColunaSelecao1}>
                  <Text style={Estilo.H2}>Tamanho:</Text>
                </View>
                {/* Coluna 2 */}
                <View style={Estilo.boxColunaSelecao2}>
                  <Text style={Estilo.H2}>Valor:</Text>
                </View>
              </View>

              {/* Aqui entra o campo de tamanho e valor */}
              {PickerTamanhoValor()}

            </View>
          </View>
          <View style={Estilo.boxNeutro}>
            <Btn2 txt="Salvar" fncClique={() => {
              navigation.navigate("Cadastro");
            }} />
          </View>
        </View>
      </Card>
    </SafeAreaView>
  )
}