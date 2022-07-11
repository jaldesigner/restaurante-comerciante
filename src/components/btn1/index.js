import {Pressable,Text, View} from 'react-native';
import React from 'react';
import cores from '../../Style/cores';

export default function Btn1(props) {
  return (
    <View>
      <Pressable style={{
          backgroundColor: cores.primaria,
          alignItems:'center',
          borderRadius:6,
          padding:5,
      }} onPress={props.fncClique}>
          <Text style={{
              color: cores.corTextoGeral,
              fontSize: 20,
              fontWeight: 'bold',
          }}>{props.txt}</Text>
      </Pressable>
    </View>
  )
}