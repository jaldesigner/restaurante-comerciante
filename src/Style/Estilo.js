import { StyleSheet } from 'react-native';
import cores from './cores';

const Estilo = StyleSheet.create({
    ContainerGeral: {
        margin:10,
        flex:1,
        alignItems: 'stretch',
        height:'100%',
    },
    ConteinerCenter: {
        margin:10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
       
    },
    //Texto comum
    TxtComum: {
        color: cores.corTextoGeral,
    },

    //Título nível 1 
    H1: {
        fontSize: 25,
        fontWeight: 'bold',
        color: cores.corTextoGeral,
    },
    //Título nível 2
    H2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: cores.corFontsDetalhes,
    },
    //Título nível 3
    H3: {
        fontSize: 15,
        fontWeight: 'bold',
        color: cores.corFontsDetalhes,
    },
    //Centraliza Itens
    ItemCenter:{
        justifyContent: 'center',
        alignItems: 'center',
    },

    //Configuração dos inputs
    tituloInput : {
        fontSize: 14,
    },
    boxInputText : {
        borderWidth:1,
        borderColor: cores.bordasLinhas,
        borderRadius: 7,
        marginBottom:20,
        paddingLeft:10,
        paddingRight:10,
    },

    boxNeutro: {
        marginTop:10,
        marginBottom:10,
    },

});

export default Estilo;