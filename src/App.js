import { View, Text, StatusBar} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routers from './router/index';

//import dos estilos
import cores from '../src/Style/cores';

//Contexts
import AuthProvider from '../src/contexts/auth';

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
        <Routers />
      </AuthProvider>
    </NavigationContainer>
  )
}