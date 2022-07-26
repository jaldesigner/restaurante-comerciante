import { View, Text, SafeAreaView, TextInput, ScrollView, Alert, Modal, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Btn2, Card } from '../../components';
import firestore from "@react-native-firebase/firestore";
import { Adicionar, Deletar, Atualizar } from '../../functions/cadastroGeral';
import Estilo from '../../Style/Estilo';
import INF from '../../config/';

const pathDb = firestore().collection('Restaurante').doc(INF().ID_APP);

export default function CadastroMedidas() {

  const [medida, setMedida] = useState('');
  const [listaMedidas, setListaMedidas] = useState('');
  const [atualiza, setAtualiza] = useState(0);
  const [uniId, setUniId] = useState('');

  //Update
  const [modalEdit, setModalEdit] = useState(false);
  const [inptTxtEdit, setInptTxtEdit] = useState('');
  const [uidEdit, setUidEdit] = useState('');

  const CadMedida = () => {
    let obj = {
      UID: uniId,
      medida: medida,
    };
    if (medida == '' || medida.length < 3) {
      alert('O campo Medida deve ter no mínimo 3 digitos!');
    } else {
      Adicionar('Medidas', uniId, obj, 'Adicionado com sucesso!');
      setMedida('');
      setAtualiza(1);
    }
  };

  useEffect(() => {
    const listaMedidas = async () => {
      const UID = (+new Date).toString(36);
      setUniId(UID);

      const lista = await pathDb.collection('Medidas').orderBy('medida').get();
      setListaMedidas(lista.docs);
      setAtualiza(0);
    }

    listaMedidas();

  }, [atualiza]);

  const AlertaDelete = (item, idItem) => {
    Alert.alert(
      "Atenção!",
      "Deseja Excluir o Item " + '"' + item + '"',
      [
        {
          text: "Sim",
          onPress: () => {
            Deletar('Medidas', idItem, 'Item deletado com sucesso!');
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

  const ListaMedidas = () => {
    if (listaMedidas.length === 0 || listaMedidas.length === undefined) {
      return (
        <View style={Estilo.ItemCenter}>
          <Text style={Estilo.TxtComum}>Não há Medidas Cadastradas</Text>
        </View>
      );
    } else {
      const lMedidas = listaMedidas.map((i, index) => {
        const medidas = i.data().medida;
        const idMedidas = i.data().UID;

        return (
          <View style={Estilo.linhaLista} key={index}>

            <View style={Estilo.boxTextoLista}>
              <Text style={Estilo.txtLista}>{medidas}</Text>
            </View>
            <View style={Estilo.boxBotaoLista}>
              <TouchableOpacity onPress={() => {
                setInptTxtEdit(i.data().medida);
                setUidEdit(idMedidas);
                setModalEdit(!modalEdit)
              }} style={Estilo.btnLista}>
                <Text style={Estilo.txtLinkPositivo}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                AlertaDelete(medidas, idMedidas);
              }} style={Estilo.btnLista}>
                <Text style={Estilo.txtLinkNegativo}>Del</Text>
              </TouchableOpacity>
            </View>
          </View>

        );
      });
      return lMedidas;
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
                <Text style={Estilo.H3}>Medida</Text>
                <TextInput
                  //autoFocus={true}
                  value={inptTxtEdit}
                  onChangeText={inptTxtEdit => setInptTxtEdit(inptTxtEdit)}
                  style={Estilo.boxInputText}
                  placeholder="Exp.: Grande"
                  placeholderTextColor='#6C6D80'
                />
              </View>
              <View>

              </View>
              <View style={Estilo.boxNeutro}>
                <Btn2 fncClique={() => {
                  const obj = {
                    medida: inptTxtEdit,
                  };
                  Atualizar('Medidas',uidEdit,obj,'Item Atualizado com sucesso!');
                  setInptTxtEdit('');
                  setUidEdit('');
                  setAtualiza(1); 
                  setModalEdit(!modalEdit);
                }} txt='Salvar' />
              </View>
            </View>
          </View>
        </Modal>
        <Card titulo="Cadastro de Medida" >
          <View>
            <View>
              <View style={{ marginBottom: 10 }}>
                <Text style={Estilo.H3}>Medida</Text>
              </View>
              <TextInput value={medida} onChangeText={medida =>
                setMedida(medida)}
                style={Estilo.boxInputText}
                placeholder="Exp.: Grande"
                placeholderTextColor='#6C6D80' />
            </View>

            <View style={Estilo.boxNeutro}>
              <Btn2 fncClique={CadMedida} txt='Cadastrar' />
            </View>
          </View>
        </Card>
        <Card titulo="Medidas Cadastrados">

          <View>
            <ListaMedidas />
          </View>

        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}