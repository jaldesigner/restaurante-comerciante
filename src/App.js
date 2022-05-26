import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Importando as telas
import Home from './screen/Home';
import Login from './screen/Login';
import cores from './Style/cores';
import MontarCardapio from './screen/MontarCardapio';

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
                <Stack.Navigator initialRouteName='MontarCardapio'>
                    <Stack.Screen name='Home' component={Home} options={{ headerTransparent: false, headerShown: false }} />
                    <Stack.Screen name='Login' component={Login} options={{ headerTransparent: true, headerShown: false }} />
                    <Stack.Screen name='MontarCardapio' component={MontarCardapio} options={{ headerTransparent: true, headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        
    );
}