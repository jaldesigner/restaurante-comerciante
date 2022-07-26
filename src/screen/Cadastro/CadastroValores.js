import { View, Text, SafeAreaView, TextInput, ScrollView, Alert, Modal, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Btn2, Card } from '../../components';
import firestore from "@react-native-firebase/firestore";
import { Adicionar, Deletar, Atualizar } from '../../functions/cadastroGeral';
import Estilo from '../../Style/Estilo';
import INF from '../../config/';
import { maskDinheiro, MoedaReal, MoedaRealSemSimbolo } from '../../functions/mascaras'

const pathDb = firestore().collection('Restaurante').doc(INF().ID_APP);

export default function CadastroValres() {
  const [valor, setValor] = useState('00,00');
  const [listaValor, setListaValor] = useState('');
  const [atualiza, setAtualiza] = useState(0);
  const [uniId, setUniId] = useState('');

  //Update
  const [modalEdit, setModalEdit] = useState(false);
  const [inptTxtEdit, setInptTxtEdit] = useState('');
  const [uidEdit, setUidEdit] = useState('');


  /* 
  ==========================================
  Função que converte de string para float
  para gravar no banco de dados e ser
  resgatada de melhor forma.
  ==========================================
  */
  const valorFloat = vl => {
    let v = vl.replace(",", ".");
    return parseFloat(v);
  }

  const CadValores = () => {
    let vlr = valorFloat(valor);

    let obj = {
      UID: uniId,
      valor: vlr,
    };
    if (valor == '00,00' || valor == '0,00' || valor == '') {
      alert('O valor digitado não é válido!');
    } else {
      Adicionar('Valores', uniId, obj, 'Adicionado com sucesso!');
      setValor('00,00');
      setAtualiza(1);
    }
  };

  useEffect(() => {
    const listaDeValores = async () => {
      const UID = (+new Date).toString(36);
      setUniId(UID);

      const lista = await pathDb.collection('Valores').orderBy('valor').get();
      setListaValor(lista.docs);
      setAtualiza(0);
    }

    listaDeValores();

  }, [atualiza]);

  const AlertaDelete = (item, idItem) => {
    Alert.alert(
      "Atenção!",
      "Deseja Excluir o Item " + '"' + item + '"',
      [
        {
          text: "Sim",
          onPress: () => {
            Deletar('Valores', idItem, 'Item deletado com sucesso!');
            setUniId('');
            setAtualiza(1);
          }
        },
        {
          text: "Não",
          style: 'cancel'
        }

      ]
    );
  }

  const ListaValores = () => {
    if (listaValor.length === 0 || listaValor.length === undefined) {
      return (
        <View style={Estilo.ItemCenter}>
          <Text style={Estilo.TxtComum}>Não há valores cadastrado</Text>
        </View>
      );
    } else {
      const lValores = listaValor.map((i, index) => {
        let valor = i.data().valor;
        let idValor = i.data().UID;

        return (
          <View style={Estilo.linhaLista} key={index}>

            <View style={Estilo.boxTextoLista}>
              <Text style={Estilo.txtLista}>{MoedaReal(valor)}</Text>
            </View>
            <View style={Estilo.boxBotaoLista}>
              <TouchableOpacity onPress={() => {
                //console.log(MoedaRealSemSimbolo(i.data().valor));
                setInptTxtEdit(MoedaRealSemSimbolo(i.data().valor));
                setUidEdit(idValor);
                setModalEdit(!modalEdit)
              }} style={Estilo.btnLista}>
                <Text style={Estilo.txtLinkPositivo}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                AlertaDelete(valor, idValor);
              }} style={Estilo.btnLista}>
                <Text style={Estilo.txtLinkNegativo}>Del</Text>
              </TouchableOpacity>
            </View>
          </View>

        );
      });
      return lValores;
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {/*
        =================================================================== 
        Card com o formulário de cadastro
        ===================================================================
        */}
        <Card titulo="Cadastro de Valores" >
          <View>
            <View>
              <View style={{ marginBottom: 10 }}>
                <Text style={Estilo.H3}>Valor</Text>
              </View>
              <TextInput value={valor} onChangeText={valor => {
                let v = maskDinheiro(valor);
                setValor(v)
              }}
                style={Estilo.boxInputText}
                placeholder="00,00"
                placeholderTextColor='#6C6D80'
                keyboardType='numeric'
              />
            </View>
            <View style={Estilo.boxNeutro}>
              <Btn2 fncClique={CadValores} txt='Cadastrar' />
            </View>
          </View>
        </Card>
        {/*
        =================================================================== 
        Lista de valores cadastrados
        ===================================================================
        */}
        <Card titulo="Valores Cadastrados">
          <View>
            <ListaValores />
          </View>
        </Card>

        {/*
        =================================================================== 
        Janela Modal para edição dos itens cadastrados no banco de dados 
        ===================================================================
        */}
        <Modal
          animationType='slide'
          visible={modalEdit}
          transparent={true}
          onRequestClose={() => {
            setModalEdit(!modalEdit);
          }}>
          <View style={Estilo.modalContainer}>
            <View style={Estilo.modalContent}>
              <View style={Estilo.modalContainerTitulo}>
                <Text style={Estilo.modalTxtTitulo}>Editar Item</Text>
                <TouchableOpacity style={Estilo.modalBtnClose} onPress={() => {
                  setModalEdit(false);
                }}><Text style={Estilo.modalTxtBtnClose}>X</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={Estilo.H3}>Valores</Text>
                <TextInput
                  value={inptTxtEdit}
                  onChangeText={inptTxtEdit => setInptTxtEdit(maskDinheiro(inptTxtEdit))}
                  style={Estilo.boxInputText}
                  placeholder="Exp.: 23,00"
                  placeholderTextColor='#6C6D80'
                  keyboardType='numeric'
                />
              </View>
              <View>

              </View>
              <View style={Estilo.boxNeutro}>
                <Btn2 fncClique={() => {
                  let vlr = valorFloat(inptTxtEdit);
                  const obj = {
                    valor: vlr,
                  };
                  Atualizar('Valores', uidEdit, obj, 'Item Atualizado com sucesso!');
                  setInptTxtEdit('');
                  setUidEdit('');
                  setAtualiza(1);
                  setModalEdit(!modalEdit);
                }} txt='Salvar' />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}