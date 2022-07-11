import { View, Text } from 'react-native';
import React from 'react';
import cores from '../../Style/cores';

const Titulo = (props) => {
  if (props.titulo != null) {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: cores.bordasLinhas,
        margin:10,
        paddingBottom:10,
      }}>
        <View style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 10,
          backgroundColor: cores.corFontDestaque,
        }} />
        <Text style={{
          color: cores.corTextoGeral,
          fontWeight: 'bold',
          textAlign: 'left',
          fontSize: 20,
        }}>{props.titulo}</Text>
      </View>
    );
  } else {
    return <View />
  }

}

export default function Card(props) {
  return (
    <View>
      <View style={{
        margin: 10,
        borderColor: cores.bordasLinhas,
        borderWidth: 1,
        borderRadius: 6,
      }}>
        <Titulo titulo={props.titulo}></Titulo>
        <View style={{
          padding: 10,
        }}>

          {props.children}
        </View>
      </View>
    </View>
  )
}