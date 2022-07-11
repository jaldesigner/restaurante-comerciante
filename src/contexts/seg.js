import React, {useContext} from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Seg(logado) {
    const navigation = useNavigation();
    return(
        !logado ? navigation.navigate("Login") : null
    );
}