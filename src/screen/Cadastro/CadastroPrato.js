import { View, Text, SafeAreaView, TextInput, Pressable, ScrollView, Alert, Modal, TouchableOpacity, ImageComponent, Platform, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Btn2, Card } from '../../components';
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';
import { CadastroDePrato, DeletaPrato, EditaPrato } from '../../functions/cadastro_pratos';
import Estilo from '../../Style/Estilo';
import INF from '../../config/';

const pathDb = firestore().collection('Restaurante').doc(INF().ID_APP);

export default function CadastroPrato() {

  const [uidPrato, setUidPrato] = useState('');
  const [prato, setPrato] = useState('');
  const [imgPrato, setImgPrato] = useState('');
  const [listaPratos, setListaPratos] = useState('');
  const [atualiza, setAtualiza] = useState(0);

  //Update
  const [modalEdit, setModalEdit] = useState(false);
  const [inptTxtEdit, setInptTxtEdit] = useState('');
  const [inptImgEdit, setInptImgEdit] = useState('');
  const [uidEdit, setUidEdit] = useState('');

  const uploadFile = () => {
    const opt = {
      noData: true,
      mediaType: 'photo'
    };

    ImagePicker.launchImageLibrary(opt, response => {
      if (response.didCancel) {
        console.log("Cancelou o modal");
      } else if (response.errorCode) {
        console.log('Parece que houve um erro: ' + response.errorCode);
      } else {
        const img = response.assets.map((i) => {
          //console.log(i.uri);
          setImgPrato(i.uri);
          setAtualiza(1);
        });
      }
    })

  }

  const uploadFileFirebase = async response => {
    //const fileSource = getFileLocalPath(response);
    const storageRef = storage().ref(INF().ID_APP + '/img-pratos').child(uidPrato);
    return await storageRef.putFile(imgPrato);
  };

  const buscaFoto = async () => {
    const busca = storage().ref();
  }
  useEffect(() => {
    const listaDePratos = async () => {
      const UID = (+new Date).toString(36);

      const lista = await pathDb.collection('Pratos').orderBy('nome_prato').get();

      setUidPrato(UID);
      setListaPratos(lista.docs);
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
            DeletaPrato(idItem);
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

  const EditarItem = ({ edt }) => {
    return (edt);
    {/*  */ }

  }

  const ListaPratos = () => {
    if (listaPratos.length === 0 || listaPratos.length === undefined) {
      return (<Text>Não há prato cadastrado</Text>);
    } else {
      const lPratos = listaPratos.map((i, index) => {
        const nPrato = i.data().nome_prato;
        const idPrato = i.data().UID;
        return (
          <View style={Estilo.linhaLista} key={index}>
            <View style={Estilo.boxTextoLista}>
              <Text style={Estilo.txtLista}>{i.data().nome_prato}</Text>
            </View>
            <View style={Estilo.boxBotaoLista}>
              <Pressable onPress={() => {
                setInptTxtEdit(i.data().nome_prato);
                setInptImgEdit(i.data().URL_IMG);
                setUidEdit(i.data().UID);

                setModalEdit(!modalEdit)
              }} style={Estilo.btnLista}>
                <Text style={Estilo.txtLinkPositivo}>Edit</Text>
              </Pressable>
              <Pressable onPress={() => {
                AlertaDelete(nPrato, idPrato);
              }} style={Estilo.btnLista}>
                <Text style={Estilo.txtLinkNegativo}>Del</Text>
              </Pressable>
            </View>
          </View>

        );
      });
      return lPratos;
    }
  }

  const FotoPrato = (props) => {
    if (imgPrato === '' || imgPrato === null || imgPrato === undefined) {
      return <View />
    } else {
      return (
        <Image source={
          {
            uri: imgPrato,
          }
        } style={props.stl} />
      );
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
                <Pressable style={Estilo.modalBtnClose} onPress={() => {
                  setModalEdit(false);
                }}><Text style={Estilo.modalTxtBtnClose}>X</Text></Pressable>
              </View>
              <View>
                <Text style={Estilo.H3}>Nome do prato</Text>
                <TextInput
                  //autoFocus={true}
                  value={inptTxtEdit}
                  onChangeText={inptTxtEdit => setInptTxtEdit(inptTxtEdit)}
                  style={Estilo.boxInputText}
                  placeholder="Exp.: Bife com fritas"
                  placeholderTextColor='#6C6D80' />
              </View>
              <View>
                
                <View>
                  <TouchableOpacity style={Estilo.boxInputFile} onPress={uploadFile} >
                    <Text style={Estilo.H3}>Carregar imagem</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={Estilo.boxNeutro}>
                <Btn2 fncClique={() => {
                  const obj = {
                    nome_prato: inptTxtEdit,
                    URL_IMG: inptImgEdit,
                  };
                  EditaPrato(uidEdit, obj);
                  setInptTxtEdit('');
                  setInptImgEdit('');
                  setUidEdit('');
                  setAtualiza(1);
                  setModalEdit(!modalEdit);
                }} txt='Salvar' />
              </View>
            </View>
          </View>
        </Modal>
        <Card titulo="Cad. Prato" >
          <View>
            <View>
              <Text style={Estilo.H3}>Nome do prato</Text>
              <TextInput value={prato} onChangeText={prato => setPrato(prato)} style={Estilo.boxInputText}
                placeholder="Exp.: Bife com fritas"
                placeholderTextColor='#6C6D80' />
            </View>
            <View>
              <FotoPrato stl={Estilo.fotoPratoUpload} />
            </View>
            <View>
              <TouchableOpacity style={Estilo.boxInputFile} onPress={uploadFile} >
                <Text style={Estilo.H3}>Carregar imagem</Text>
              </TouchableOpacity>
            </View>
            <View style={Estilo.boxNeutro}>
              <Btn2 fncClique={() => {
                CadastroDePrato(prato, imgPrato, uidPrato);
                uploadFileFirebase();
                setPrato('');
                setImgPrato('');
                setAtualiza(1);
              }} txt='Cadastrar' />
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