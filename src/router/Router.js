import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import das telas
import Home from '../screen/Home';
import MontarCardapio from '../screen/MontarCardapio';
import Cadastro from '../screen/Cadastro';
import CadastroPrato from '../screen/Cadastro/CadastroPrato';
import CadastroAcompanhamento from '../screen/Cadastro/CadastroAcompanhamento';
import CadastroValres from '../screen/Cadastro/CadastroValres';
import CadastroMedidas from '../screen/Cadastro/CadastroMedidas';


const RouterStack = createNativeStackNavigator();

export default function AppRouter() {

  return (

    <RouterStack.Navigator initialRouteName="CadastroPrato">
      <RouterStack.Screen name='Home' component={Home} options={{ headerTransparent: false, headerShown: false }} />
      <RouterStack.Screen name='MontarCardapio' component={MontarCardapio} options={{ headerTransparent: true, headerShown: false }} />

      {/** Cadastros de produtos */}
      <RouterStack.Screen name='Cadastro' component={Cadastro} options={{ headerTransparent: true, headerShown: false }} />
      <RouterStack.Screen name='CadastroPrato' component={CadastroPrato} options={{ headerTransparent: true, headerShown: false }} />
      <RouterStack.Screen name='CadastroAcompanhamento' component={CadastroAcompanhamento} options={{ headerTransparent: true, headerShown: false }} />
      <RouterStack.Screen name='CadastroValres' component={CadastroValres} options={{ headerTransparent: true, headerShown: false }} />
      <RouterStack.Screen name='CadastroMedidas' component={CadastroMedidas} options={{ headerTransparent: true, headerShown: false }} />
    </RouterStack.Navigator>

  );
}