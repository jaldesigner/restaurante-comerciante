import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Contexts
import AuthProvider from './contexts/auth';

//import das telas
import Home from './screen/Home';
import Login from './screen/Login';
import MontarCardapio from './screen/MontarCardapio';
import Cadastro from './screen/Cadastro';
import CadastroPrato from './screen/Cadastro/CadastroPrato'
import CadastroAcompanhamento from './screen/Cadastro/CadastroAcompanhamento'
import CadastroValres from './screen/Cadastro/CadastroValres'
import CadastroMedidas from './screen/Cadastro/CadastroMedidas'

//import dos estilos
import cores from './Style/cores';


const Stack = createNativeStackNavigator();

export default function App() {

  const MyTheme = {
    dark: true,
    colors: {
      primary: cores.primaria,
      background: cores.fundoApp,
      card: cores.bordasLinhas,
      text: '#ffffff',
      border: cores.bordasLinhas,
      notification: 'rgb(255, 69, 58)',
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthProvider>
        <StatusBar backgroundColor={"#2D2D3F"} barStyle={"light-content"} />
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Home' component={Home} options={{ headerTransparent: false, headerShown: false }} />
          <Stack.Screen name='Login' component={Login} options={{ headerTransparent: true, headerShown: false }} />
          <Stack.Screen name='MontarCardapio' component={MontarCardapio} options={{ headerTransparent: true, headerShown: false }} />

          {/** Cadastros de produtos */}
          <Stack.Screen name='Cadastro' component={Cadastro} options={{ headerTransparent: true, headerShown: false }} />
          <Stack.Screen name='CadastroPrato' component={CadastroPrato} options={{ headerTransparent: true, headerShown: false }} />
          <Stack.Screen name='CadastroAcompanhamento' component={CadastroAcompanhamento} options={{ headerTransparent: true, headerShown: false }} />
          <Stack.Screen name='CadastroValres' component={CadastroValres} options={{ headerTransparent: true, headerShown: false }} />
          <Stack.Screen name='CadastroMedidas' component={CadastroMedidas} options={{ headerTransparent: true, headerShown: false }} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}