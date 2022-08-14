import React from 'react';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

//import das telas
import Home from '../screen/Home';
import MontarCardapio from '../screen/MontarCardapio';
import Dwr from '../components/drawer';

import Cadastro from '../screen/Cadastro';
import CadastroPrato from '../screen/Cadastro/CadastroPrato';
import CadastroAcompanhamento from '../screen/Cadastro/CadastroAcompanhamento';
import CadastroValores from '../screen/Cadastro/CadastroValores';
import CadastroMedidas from '../screen/Cadastro/CadastroMedidas';
import { View } from 'react-native';

//const RouterStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppRouter() {

  return (
      <Drawer.Navigator initialRouteName="MontarCardapio" drawerContent={props => <Dwr {...props} />} >
        <Drawer.Screen name='Home' component={Home} options={{ headerTransparent: false, headerShown: false }} />
        <Drawer.Screen name='MontarCardapio' component={MontarCardapio} options={{ headerTransparent: true, headerShown: false }} />

        {/** Cadastros de produtos */}
        <Drawer.Screen name='Cadastro' component={Cadastro} options={{ headerTransparent: true, headerShown: false }} />
        <Drawer.Screen name='CadastroPrato' component={CadastroPrato} options={{ headerTransparent: true, headerShown: false }} />
        <Drawer.Screen name='CadastroAcompanhamento' component={CadastroAcompanhamento} options={{ headerTransparent: true, headerShown: false }} />
        <Drawer.Screen name='CadastroValores' component={CadastroValores} options={{ headerTransparent: true, headerShown: false }} />
        <Drawer.Screen name='CadastroMedidas' component={CadastroMedidas} options={{ headerTransparent: true, headerShown: false }} />
        
      </Drawer.Navigator>

  );
}