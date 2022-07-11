import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/Login';

const AuthStack = createNativeStackNavigator();

export default function AuthRouters() {

    

    return (
        <AuthStack.Navigator initialRouteName="Login">
            <AuthStack.Screen name='Login' component={Login} options={{ headerTransparent: true, headerShown: false }} />
        </AuthStack.Navigator>
    )
}