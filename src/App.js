import {StatusBar } from 'react-native';
import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routers from './router/index';

//import dos estilos
import cores from '../src/Style/cores';

//Contexts
import AuthProvider from '../src/contexts/auth';
import { CTX_SelecaoPrato } from './contexts';

export default function App() {

  const ctx_selecaoPrato = useState([]);

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
      <CTX_SelecaoPrato.Provider value={ctx_selecaoPrato}>
        <AuthProvider>
          <StatusBar backgroundColor={"#2D2D3F"} barStyle={"light-content"} />
          <Routers />
        </AuthProvider>
      </CTX_SelecaoPrato.Provider>
    </NavigationContainer>
  )
}