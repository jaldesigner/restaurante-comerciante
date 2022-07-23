import { View, Text, SafeAreaView, TextInput, ScrollView, Alert, Modal, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Btn2, Card } from '../../components';
import firestore from "@react-native-firebase/firestore";
import { Adicionar, Deletar, Atualizar } from '../../functions/cadastroGeral';
import Estilo from '../../Style/Estilo';
import INF from '../../config/';

const pathDb = firestore().collection('Restaurante').doc(INF().ID_APP);

export default function CadastroAcompanhamento() {

  const [acompanhamento, setAcompanhamento] = useState('');
  const [listaAcompanhamento, setListaAcompanhamento] = useState('');
  const [atualiza, setAtualiza] = useState(0);
  const [uniId, setUniId] = useState('');
  const [uid, setUid] = useState('');

  //Update
  const [modalEdit, setModalEdit] = useState(false);
  const [inptTxtEdit, setInptTxtEdit] = useState('');
  const [uidEdit, setUidEdit] = useState('');

  //Adicionar('Acompanhamento',uniId,obj,"Adicionado com sucesso!");
  //Deletar('Acompanhamento',uniId,'Deletado com sucesso!');
  //Atualizar( 'Acompanhamento',uniId,obj,'Atualizado com sucesso!');

  const CadAcompanhamento = () => {
    let obj = {
      UID: uniId,
      acompanhamento: acompanhamento,
    };
    if (acompanhamento == '' || acompanhamento.length < 3) {
      alert('O acompanhamento deve ter mais de 3 digitos!');
    } else {
      Adicionar('Acompanhamento', uniId, obj, 'Adicionado com sucesso!');
      setAcompanhamento('');
      setAtualiza(1);
    }
  };

  useEffect(() => {
    const listaDePratos = async () => {
      const UID = (+new Date).toString(36);
      setUniId(UID);

      const lista = await pathDb.collection('Acompanhamento').orderBy('acompanhamento').get();
      setListaAcompanhamento(lista.docs);
      setAtualiza(0);
    }

    listaDePratos();

  }, [atualiza]);

  const AlertaDelete = (item, idItem) => {
    Alert.alert(
      "Atenção!",
      "Deseja Excluir o Item " + '"' + item + '"',
      [
        {
          text: "Sim",
          onPress: () => {
            Deletar('Acompanhamento', idItem, 'Item deletado com sucesso!');
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

  const ListaPratos = () => {
    if (listaAcompanhamento.length === 0 || listaAcompanhamento.length === undefined) {
      return (
        <View style={Estilo.ItemCenter}>
          <Text style={Estilo.TxtComum}>Não há acompanhamento Cadastrado</Text>
        </View>
      );
    } else {
      const lPratos = listaAcompanhamento.map((i, index) => {
        const acompanhamento = i.data().acompanhamento;
        const idAcompanhamento = i.data().UID;
        const img = i.data().URL_IMG;

        return (
          <View style={Estilo.linhaLista} key={index}>

            <View style={Estilo.boxTextoLista}>
              <Text style={Estilo.txtLista}>{acompanhamento}</Text>
            </View>
            <View style={Estilo.boxBotaoLista}>
              <TouchableOpacity onPress={() => {
                setInptTxtEdit(i.data().nome_prato);
                setModalEdit(!modalEdit)
              }} style={Estilo.btnLista}>
                <Text style={Estilo.txtLinkPositivo}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                AlertaDelete(acompanhamento, idAcompanhamento);
              }} style={Estilo.btnLista}>
                <Text style={Estilo.txtLinkNegativo}>Del</Text>
              </TouchableOpacity>
            </View>
          </View>

        );
      });
      return lPratos;
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Modal
          animationType='slide'
          visible={modalEdit}
          transparent={true}
          onRequestClose={() => {
            setModalEdit(!modalEdit);
          }}
        >
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
                <Text style={Estilo.H3}>Acompanhamento</Text>
                <TextInput
                  //autoFocus={true}
                  value={inptTxtEdit}
                  onChangeText={inptTxtEdit => setInptTxtEdit(inptTxtEdit)}
                  style={Estilo.boxInputText}
                  placeholder="Exp.: Arroz, feijão, batata corada"
                  placeholderTextColor='#6C6D80'
                />
              </View>
              <View>

              </View>
              <View style={Estilo.boxNeutro}>
                <Btn2 fncClique={() => {
                  const obj = {
                    nome_prato: inptTxtEdit,
                  };
                  setInptTxtEdit('');
                  setAtualiza(1);
                  setModalEdit(!modalEdit);
                }} txt='Salvar' />
              </View>
            </View>
          </View>
        </Modal>
        <Card titulo="Cadastro de Acompanhamento" >
          <View>
            <View>
              <View style={{ marginBottom: 10 }}>
                <Text style={Estilo.H3}>Acompanhamento</Text>
              </View>
              <TextInput value={acompanhamento} onChangeText={acompanhamento => setAcompanhamento(acompanhamento)} style={Estilo.boxInputText}
                placeholder="Exp.: Arroz, feijão, batata corada"
                placeholderTextColor='#6C6D80' />
            </View>

            <View style={Estilo.boxNeutro}>
              <Btn2 fncClique={CadAcompanhamento} txt='Cadastrar' />
            </View>
          </View>
        </Card>
        <Card titulo="Pratos Cadastrados">

          <View>
            <ListaPratos />
          </View>

        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}