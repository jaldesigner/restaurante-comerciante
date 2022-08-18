import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { DrawerContent } from '@react-navigation/drawer';

export default function Dwr(props) {
  return (
    <View style={stl.container}>
      <View style={stl.topo}>
        <Text style={stl.titulo}>ADM Painel</Text>
      </View>
      <View style={stl.content}>
        <View style={stl.boxLink}>
          <TouchableOpacity style={stl.link}>
            <Text style={stl.txtLink}>Home</Text>
          </TouchableOpacity>
        </View>
        <View style={stl.boxLink}>
          <TouchableOpacity style={stl.link}>
            <Text style={stl.txtLink}>Cardápio</Text>
          </TouchableOpacity>
        </View>
        <View style={stl.boxLink}>
          <TouchableOpacity style={stl.link}>
            <Text style={stl.txtLink}>Ordens</Text>
          </TouchableOpacity>
        </View>
        <View style={stl.boxLink}>
          <TouchableOpacity style={stl.link}>
            <Text style={stl.txtLink}>Cadastro</Text>
          </TouchableOpacity>
        </View>
        <View style={stl.boxLink}>
          <TouchableOpacity style={stl.link}>
            <Text style={stl.txtLink}>Administrar</Text>
          </TouchableOpacity>
        </View>
        <View style={stl.boxLink}>
          <TouchableOpacity style={stl.link}>
            <Text style={stl.txtLinkSair}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const stl = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D3F',
  },
  content: {
    padding: 10
  },
  topo: {
    alignItems: 'center',
    borderBottomColor: "#6C6D80",
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 20
  },
  titulo: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  boxLink: {
    marginBottom: 10,
    borderBottomColor: "#4E5063",
    borderBottomWidth: 1,
  },
  link: {
    alignItems: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
  },
  txtLink: {
    color: '#61C6FF',
    fontSize: 18,
  },
  txtLinkSair: {
    color: '#CF565F',
    fontSize: 18,
  }


});